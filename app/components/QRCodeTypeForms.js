import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLink,
  FaTextHeight,
  FaEnvelope,
  FaSms,
  FaIdCard,
  FaWifi,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';

const InputField = ({ icon: Icon, ...props }) => (
  <motion.div 
    className="relative mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4cd681] text-xl" />
    <input
      {...props}
      className="w-full p-4 pl-12 text-lg bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#4cd681]/20 focus:border-[#4cd681] outline-none transition-all duration-300 hover:border-[#4cd681]"
    />
  </motion.div>
);

const TextArea = ({ icon: Icon, ...props }) => (
  <motion.div 
    className="relative mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="absolute left-4 top-6 text-[#4cd681] text-xl" />
    <textarea
      {...props}
      className="w-full p-4 pl-12 text-lg bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#4cd681]/20 focus:border-[#4cd681] outline-none transition-all duration-300 hover:border-[#4cd681] min-h-[120px]"
    />
  </motion.div>
);

const Select = ({ icon: Icon, ...props }) => (
  <motion.div 
    className="relative mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4cd681] text-xl" />
    <select
      {...props}
      className="w-full p-4 pl-12 text-lg bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#4cd681]/20 focus:border-[#4cd681] outline-none transition-all duration-300 hover:border-[#4cd681] appearance-none"
    />
  </motion.div>
);

export default function QRCodeTypeForms({ qrType }) {
  return (
    <motion.div 
      className="w-full transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <input type="hidden" name="qrType" value={qrType} />

      {qrType === 'URL' && (
        <InputField
          icon={FaLink}
          type="url"
          name="url"
          placeholder="Enter URL"
          required
        />
      )}

      {qrType === 'Text' && (
        <TextArea
          icon={FaTextHeight}
          name="text"
          placeholder="Enter text"
          required
        />
      )}

      {qrType === 'Email' && (
        <>
          <InputField
            icon={FaEnvelope}
            type="email"
            name="emailAddress"
            placeholder="Recipient Email"
            required
          />
          <InputField
            icon={FaTextHeight}
            type="text"
            name="emailSubject"
            placeholder="Subject"
          />
          <TextArea
            icon={FaTextHeight}
            name="emailBody"
            placeholder="Message"
          />
        </>
      )}

      {qrType === 'SMS' && (
        <>
          <InputField
            icon={FaSms}
            type="tel"
            name="smsNumber"
            placeholder="Recipient Phone Number"
            required
          />
          <TextArea
            icon={FaTextHeight}
            name="smsMessage"
            placeholder="Enter your message"
          />
        </>
      )}

      {qrType === 'vCard' && (
        <>
          <InputField
            icon={FaIdCard}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <InputField
            icon={FaIdCard}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <InputField
            icon={FaPhoneAlt}
            type="tel"
            name="phone"
            placeholder="Phone Number"
          />
          <InputField
            icon={FaEnvelope}
            type="email"
            name="email"
            placeholder="Email"
          />
          <InputField
            icon={FaIdCard}
            type="text"
            name="organization"
            placeholder="Organization"
          />
        </>
      )}

      {qrType === 'WiFi' && (
        <>
          <InputField
            icon={FaWifi}
            type="text"
            name="wifiSsid"
            placeholder="Network SSID"
            required
          />
          <InputField
            icon={FaWifi}
            type="text"
            name="wifiPassword"
            placeholder="Password"
          />
          <Select
            icon={FaWifi}
            name="wifiEncryption"
          >
            <option value="">None</option>
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
          </Select>
          <motion.label 
            className="flex items-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input type="checkbox" name="wifiHidden" className="mr-3 w-5 h-5 text-[#4cd681]" />
            <span className="text-gray-700 text-lg">Hidden Network</span>
          </motion.label>
        </>
      )}

      {qrType === 'Event' && (
        <>
          <InputField
            icon={FaCalendarAlt}
            type="text"
            name="eventTitle"
            placeholder="Event Title"
            required
          />
          <InputField
            icon={FaMapMarkerAlt}
            type="text"
            name="eventLocation"
            placeholder="Event Location"
          />
          <InputField
            icon={FaCalendarAlt}
            type="datetime-local"
            name="eventStart"
            placeholder="Start Date & Time"
            required
          />
          <InputField
            icon={FaCalendarAlt}
            type="datetime-local"
            name="eventEnd"
            placeholder="End Date & Time"
          />
          <TextArea
            icon={FaTextHeight}
            name="eventDescription"
            placeholder="Description"
          />
        </>
      )}

      {qrType === 'Geo' && (
        <>
          <InputField
            icon={FaMapMarkerAlt}
            type="text"
            name="geoLatitude"
            placeholder="Latitude"
            required
          />
          <InputField
            icon={FaMapMarkerAlt}
            type="text"
            name="geoLongitude"
            placeholder="Longitude"
            required
          />
        </>
      )}

      {qrType === 'Phone' && (
        <InputField
          icon={FaPhoneAlt}
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          required
        />
      )}

      {qrType === 'WhatsApp' && (
        <>
          <InputField
            icon={FaWhatsapp}
            type="tel"
            name="waNumber"
            placeholder="WhatsApp Number (with country code)"
            required
          />
          <TextArea
            icon={FaTextHeight}
            name="waMessage"
            placeholder="Message"
          />
        </>
      )}
    </motion.div>
  );
}