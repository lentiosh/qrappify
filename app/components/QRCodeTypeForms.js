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
  
  // InputField component for styled inputs with icons
  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative mb-4">
      <Icon className="absolute left-3 top-3 text-green-500" />
      <input
        {...props}
        className="w-full p-2 pl-10 bg-white border-none rounded-full shadow-neumorphic focus:shadow-neumorphic-focus outline-none transition-all duration-300"
      />
    </div>
  );
  
  // TextArea component for styled text areas with icons
  const TextArea = ({ icon: Icon, ...props }) => (
    <div className="relative mb-4">
      <Icon className="absolute left-3 top-3 text-green-500" />
      <textarea
        {...props}
        className="w-full p-2 pl-10 bg-white border-none rounded-2xl shadow-neumorphic focus:shadow-neumorphic-focus outline-none transition-all duration-300 min-h-[100px]"
      />
    </div>
  );
  
  export default function QRCodeTypeForms({ qrType }) {
    return (
      <div className="w-full transition-all duration-300">
        <input type="hidden" name="qrType" value={qrType} />
  
        {/* URL Form */}
        {qrType === 'URL' && (
          <InputField
            icon={FaLink}
            type="url"
            name="url"
            placeholder="Enter URL"
            required
          />
        )}
  
        {/* Text Form */}
        {qrType === 'Text' && (
          <TextArea
            icon={FaTextHeight}
            name="text"
            placeholder="Enter text"
            required
          />
        )}
  
        {/* Email Form */}
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
  
        {/* SMS Form */}
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
  
        {/* vCard Form */}
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
  
        {/* WiFi Form */}
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
            <div className="relative mb-4">
              <select
                name="wifiEncryption"
                className="w-full p-2 pl-10 bg-white border-none rounded-full shadow-neumorphic focus:shadow-neumorphic-focus outline-none transition-all duration-300"
              >
                <option value="">None</option>
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
              </select>
              <FaWifi className="absolute left-3 top-3 text-green-500" />
            </div>
            <label className="flex items-center mb-4">
              <input type="checkbox" name="wifiHidden" className="mr-2" />
              <span className="text-gray-700">Hidden Network</span>
            </label>
          </>
        )}
  
        {/* Event Form */}
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
  
        {/* Geo Location Form */}
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
  
        {/* Phone Number Form */}
        {qrType === 'Phone' && (
          <InputField
            icon={FaPhoneAlt}
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            required
          />
        )}
  
        {/* WhatsApp Form */}
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

      </div>
    );
  }