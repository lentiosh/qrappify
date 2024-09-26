'use server';

import QRCode from 'qrcode';

export async function generateQRCodeAction(formData) {
  const qrType = formData.get('qrType');
  const foregroundColor = formData.get('foregroundColor') || '#000000';
  const backgroundColor = formData.get('backgroundColor') || '#FFFFFF';

  let dataToEncode = '';

  try {
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

      case 'Bitcoin':
        const btcAddress = formData.get('btcAddress');
        if (!btcAddress) throw new Error('Bitcoin address is required');
        const btcAmount = formData.get('btcAmount') || '';
        const btcLabel = formData.get('btcLabel') || '';

        dataToEncode = `bitcoin:${btcAddress}`;
        if (btcAmount || btcLabel) {
          dataToEncode += '?';
          const params = [];
          if (btcAmount) params.push(`amount=${btcAmount}`);
          if (btcLabel) params.push(`label=${encodeURIComponent(btcLabel)}`);
          dataToEncode += params.join('&');
        }
        break;

      default:
        throw new Error('Invalid QR code type');
    }

    // QR Code Generation Options
    const opts = {
      errorCorrectionLevel: 'M',
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
      width: 256,
    };

    // Generate PNG Data URL
    const pngDataUrl = await QRCode.toDataURL(dataToEncode, opts);

    // Generate SVG Data URL
    const svgString = await QRCode.toString(dataToEncode, { ...opts, type: 'svg' });
    const svgDataUrl = 'data:image/svg+xml;base64,' + Buffer.from(svgString).toString('base64');

    // Generate JPEG Data URL
    const jpegDataUrl = await QRCode.toDataURL(dataToEncode, { ...opts, type: 'image/jpeg' });

    return { pngDataUrl, svgDataUrl, jpegDataUrl };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Failed to generate QR Code');
  }
}

// Helper function to format date and time for the event
function formatDateTime(dateTimeString) {
  if (!dateTimeString) return '';
  // Format: YYYYMMDDTHHMMSSZ
  const date = new Date(dateTimeString);
  const year = date.getUTCFullYear().toString().padStart(4, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}