import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import mime from 'mime-types';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const qrType = formData.get('qrType');
    const foregroundColor = formData.get('foregroundColor') || '#000000';
    const backgroundColor = formData.get('backgroundColor') || '#FFFFFF';
    const quality = formData.get('quality') || 'medium';
    const label = formData.get('label') || '';

    let sticker = null;
    let logo = null;

    // Handle custom sticker upload
    const customSticker = formData.get('customSticker');
    if (customSticker && customSticker instanceof Blob) {
      const stickerMime = mime.lookup(customSticker.name);
      if (stickerMime && stickerMime.startsWith('image/')) {
        sticker = await customSticker.arrayBuffer();
      }
    } else {
      const stickerJson = formData.get('sticker');
      if (stickerJson) {
        const stickerData = JSON.parse(stickerJson);
        const stickerPath = path.join(process.cwd(), 'public', stickerData.url);
        sticker = await fs.readFile(stickerPath);
      }
    }

    // Handle custom logo upload
    const customLogo = formData.get('customLogo');
    if (customLogo && customLogo instanceof Blob) {
      const logoMime = mime.lookup(customLogo.name);
      if (logoMime && logoMime.startsWith('image/')) {
        logo = await customLogo.arrayBuffer();
      }
    } else {
      const logoJson = formData.get('logo');
      if (logoJson) {
        const logoData = JSON.parse(logoJson);
        const logoPath = path.join(process.cwd(), 'public', logoData.url);
        logo = await fs.readFile(logoPath);
      }
    }

    let dataToEncode = '';

    // Handle different QR types
    switch (qrType) {
      case 'URL':
        dataToEncode = formData.get('url');
        if (!dataToEncode) throw new Error('URL is required');
        break;
      case 'Text':
        dataToEncode = formData.get('text');
        if (!dataToEncode) throw new Error('Text is required');
        break;
      case 'Email':
        const emailAddress = formData.get('emailAddress');
        if (!emailAddress) throw new Error('Email address is required');
        const emailSubject = formData.get('emailSubject') || '';
        const emailBody = formData.get('emailBody') || '';
        dataToEncode = `MATMSG:TO:${emailAddress};SUB:${emailSubject};BODY:${emailBody};;`;
        break;
      case 'SMS':
        const smsNumber = formData.get('smsNumber');
        if (!smsNumber) throw new Error('Phone number is required');
        const smsMessage = formData.get('smsMessage') || '';
        dataToEncode = `SMSTO:${smsNumber}:${smsMessage}`;
        break;
      case 'vCard':
        const firstName = formData.get('firstName') || '';
        const lastName = formData.get('lastName') || '';
        const phone = formData.get('phone') || '';
        const email = formData.get('email') || '';
        const organization = formData.get('organization') || '';
        dataToEncode = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName}\nFN:${firstName} ${lastName}\nORG:${organization}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
        break;
      case 'WiFi':
        const wifiSsid = formData.get('wifiSsid');
        if (!wifiSsid) throw new Error('Network SSID is required');
        const wifiPassword = formData.get('wifiPassword') || '';
        const wifiEncryption = formData.get('wifiEncryption') || '';
        const wifiHidden = formData.get('wifiHidden') ? 'H:true;' : '';
        dataToEncode = `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};${wifiHidden};`;
        break;
      case 'Event':
        const eventTitle = formData.get('eventTitle');
        const eventLocation = formData.get('eventLocation') || '';
        const eventStart = formData.get('eventStart');
        const eventEnd = formData.get('eventEnd') || '';
        const eventDescription = formData.get('eventDescription') || '';

        if (!eventTitle || !eventStart) throw new Error('Event title and start time are required');

        dataToEncode = `BEGIN:VEVENT\nSUMMARY:${eventTitle}\nLOCATION:${eventLocation}\nDTSTART:${formatDateTime(eventStart)}\n`;
        if (eventEnd) {
          dataToEncode += `DTEND:${formatDateTime(eventEnd)}\n`;
        }
        dataToEncode += `DESCRIPTION:${eventDescription}\nEND:VEVENT`;
        break;
      case 'Geo':
        const geoLatitude = formData.get('geoLatitude');
        const geoLongitude = formData.get('geoLongitude');
        if (!geoLatitude || !geoLongitude) throw new Error('Latitude and longitude are required');
        dataToEncode = `GEO:${geoLatitude},${geoLongitude}`;
        break;
      case 'Phone':
        const phoneNumber = formData.get('phoneNumber');
        if (!phoneNumber) throw new Error('Phone number is required');
        dataToEncode = `TEL:${phoneNumber}`;
        break;
      case 'WhatsApp':
        const waNumber = formData.get('waNumber');
        if (!waNumber) throw new Error('WhatsApp number is required');
        const waMessage = encodeURIComponent(formData.get('waMessage') || '');
        dataToEncode = `https://wa.me/${waNumber}${waMessage ? `?text=${waMessage}` : ''}`;
        break;
      default:
        throw new Error('Invalid QR code type');
    }

    // Set QR Code options
    const opts = {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: foregroundColor,
        light: '#FFFFFF00', // Transparent background for QR code
      },
    };

    const outputSize =
      quality === 'high' ? 1024 : quality === 'medium' ? 512 : 256;
    const qrCodeSize = Math.floor(outputSize * 0.55); // QR code size is 55% of output size

    // Generate the QR code buffer for PNG and JPEG
    const qrCodeBuffer = await QRCode.toBuffer(dataToEncode, {
      ...opts,
      width: qrCodeSize,
      type: 'png',
    });

    // Generate the QR code SVG string
    const svgString = await QRCode.toString(dataToEncode, {
      ...opts,
      width: qrCodeSize,
      type: 'svg',
    });

    // Create base image (sticker or white background)
    let baseImage;
    if (sticker) {
      baseImage = sharp(Buffer.from(sticker)).resize(outputSize, outputSize, {
        fit: 'cover',
      });
    } else {
      baseImage = sharp({
        create: {
          width: outputSize,
          height: outputSize,
          channels: 4,
          background: backgroundColor,
        },
      });
    }

    // Prepare composites array
    const composites = [];

    // Add QR code to the composites, centered on the sticker
    composites.push({
      input: qrCodeBuffer,
      top: Math.floor((outputSize - qrCodeSize) / 2),
      left: Math.floor((outputSize - qrCodeSize) / 2),
      blend: 'over',
    });

    // Add logo if provided, centered over the QR code
    if (logo) {
      const logoSize = Math.floor(qrCodeSize * 0.36); // Logo size is 36% of QR code size
      const logoBuffer = await sharp(Buffer.from(logo))
        .resize(logoSize, logoSize, { fit: 'contain' })
        .png()
        .toBuffer();

      composites.push({
        input: logoBuffer,
        top:
          Math.floor((outputSize - qrCodeSize) / 2) +
          Math.floor((qrCodeSize - logoSize) / 2),
        left:
          Math.floor((outputSize - qrCodeSize) / 2) +
          Math.floor((qrCodeSize - logoSize) / 2),
        blend: 'over',
      });
    }

    // Add label if provided
    if (label) {
      const labelHeight = Math.floor(outputSize * 0.1); // Label height is 10% of output size
      const svgLabel = `
        <svg width="${outputSize}" height="${labelHeight}">
          <rect width="100%" height="100%" fill="${backgroundColor}" />
          <text
            x="50%"
            y="50%"
            font-family="Arial, sans-serif"
            font-size="${Math.floor(labelHeight * 0.7)}"
            fill="${foregroundColor}"
            text-anchor="middle"
            dominant-baseline="central"
          >
            ${label}
          </text>
        </svg>
      `;

      baseImage = baseImage.extend({
        bottom: labelHeight,
        background: backgroundColor,
      });

      composites.push({
        input: Buffer.from(svgLabel),
        top: outputSize,
        left: 0,
        blend: 'over',
      });
    }

    // Apply all composites
    baseImage = baseImage.composite(composites);

    // Generate the final PNG image
    const pngBuffer = await baseImage.png().toBuffer();
    const pngDataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;

    // Generate the final JPEG image
    const jpegBuffer = await baseImage.jpeg().toBuffer();
    const jpegDataUrl = `data:image/jpeg;base64,${jpegBuffer.toString('base64')}`;

    // Generate SVG Data URL (Note: SVG does not include stickers, logos, or labels in this implementation)
    const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;

    return NextResponse.json({ pngDataUrl, jpegDataUrl, svgDataUrl, label });
  } catch (error) {
    console.error('QR Code Generation Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate QR Code' },
      { status: 500 }
    );
  }
}

// Helper function to format date-time for events (Add this function)
function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0];
}