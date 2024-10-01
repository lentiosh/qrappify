import React from 'react';
import InputField from './InputField';

export default function QRCodeTypeForms({ qrType }) {
  return (
    <div>
      {qrType === 'URL' && (
        <InputField
          icon="FaLink"
          type="url"
          name="url"
          placeholder="Enter URL"
          required
        />
      )}
      {qrType === 'Text' && (
        <InputField
          icon="FaTextHeight"
          type="text"
          name="text"
          placeholder="Enter Text"
          required
        />
      )}
      {qrType === 'Email' && (
        <>
          <InputField
            icon="FaEnvelope"
            type="email"
            name="emailAddress"
            placeholder="Enter Email Address"
            required
          />
          <InputField
            icon="FaEnvelope"
            type="text"
            name="emailSubject"
            placeholder="Enter Email Subject"
          />
          <InputField
            icon="FaEnvelope"
            type="text"
            name="emailBody"
            placeholder="Enter Email Body"
          />
        </>
      )}
      {qrType === 'SMS' && (
        <>
          <InputField
            icon="FaSms"
            type="tel"
            name="smsNumber"
            placeholder="Enter SMS Number"
            required
          />
          <InputField
            icon="FaSms"
            type="text"
            name="smsMessage"
            placeholder="Enter SMS Message"
          />
        </>
      )}
      {qrType === 'vCard' && (
        <>
          <InputField
            icon="FaIdCard"
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            required
          />
          <InputField
            icon="FaIdCard"
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            required
          />
          <InputField
            icon="FaPhoneAlt"
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
          />
          <InputField
            icon="FaEnvelope"
            type="email"
            name="email"
            placeholder="Enter Email"
          />
          <InputField
            icon="FaIdCard"
            type="text"
            name="organization"
            placeholder="Enter Organization"
          />
        </>
      )}
      {qrType === 'WiFi' && (
        <>
          <InputField
            icon="FaWifi"
            type="text"
            name="wifiSsid"
            placeholder="Enter WiFi SSID"
            required
          />
          <InputField
            icon="FaWifi"
            type="password"
            name="wifiPassword"
            placeholder="Enter WiFi Password"
          />
          <InputField
            icon="FaWifi"
            type="text"
            name="wifiEncryption"
            placeholder="Enter WiFi Encryption (e.g., WPA)"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="wifiHidden"
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="text-gray-700">Hidden Network?</span>
          </label>
        </>
      )}
      {qrType === 'Event' && (
        <>
          <InputField
            icon="FaCalendarAlt"
            type="text"
            name="eventTitle"
            placeholder="Enter Event Title"
            required
          />
          <InputField
            icon="FaMapMarkerAlt"
            type="text"
            name="eventLocation"
            placeholder="Enter Event Location"
          />
          <InputField
            icon="FaCalendarAlt"
            type="datetime-local"
            name="eventStart"
            placeholder="Enter Event Start Date & Time"
          />
          <InputField
            icon="FaCalendarAlt"
            type="datetime-local"
            name="eventEnd"
            placeholder="Enter Event End Date & Time"
          />
          <InputField
            icon="FaTextHeight"
            type="text"
            name="eventDescription"
            placeholder="Enter Event Description"
          />
        </>
      )}
      {qrType === 'Geo' && (
        <>
          <InputField
            icon="FaMapMarkerAlt"
            type="text"
            name="geoLatitude"
            placeholder="Enter Latitude"
            required
          />
          <InputField
            icon="FaMapMarkerAlt"
            type="text"
            name="geoLongitude"
            placeholder="Enter Longitude"
            required
          />
        </>
      )}
      {qrType === 'Phone' && (
        <InputField
          icon="FaPhoneAlt"
          type="tel"
          name="phoneNumber"
          placeholder="Enter Phone Number"
          required
        />
      )}
      {qrType === 'WhatsApp' && (
        <>
          <InputField
            icon="FaWhatsapp"
            type="tel"
            name="waNumber"
            placeholder="Enter WhatsApp Number"
            required
          />
          <InputField
            icon="FaTextHeight"
            type="text"
            name="waMessage"
            placeholder="Enter WhatsApp Message"
          />
        </>
      )}
    </div>
  );
}