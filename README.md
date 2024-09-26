# GRappify - QR Code Generator App

A modern, responsive QR Code generator built with Next.js (version 14), Tailwind CSS, and server actions. This app allows users to generate QR codes for different types such as URL, Text, Email, SMS, vCard, WiFi, and more. Users can customize the foreground and background colors of the QR codes and download them in PNG, SVG, or JPEG formats.

## Features

- **QR Code Types:**
  - URL
  - Text
  - Email
  - SMS
  - vCard
  - WiFi
  - Event (Calendar Invite)
  - Geo Location
  - Phone Number
  - WhatsApp Message
  - Bitcoin Address
- **Customization:**
  - Set foreground and background colors of the QR Code.
- **Download Formats:**
  - PNG
  - SVG
  - JPEG
- **Responsive Design:**
  - Works on both desktop and mobile devices.
  - Mobile-friendly UI with hamburger menu for navigation.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) (version 14) - Latest version with the App Directory structure.
  - [Tailwind CSS](https://tailwindcss.com/) - For responsive and modern design.
  - [React Icons](https://react-icons.github.io/react-icons/) - Used for the QR type icons.
- **Backend:**
  - Server actions for QR code generation using `qrcode` library.

## How to Use

1. **Select the QR Code Type:**
   - Choose the type of QR code you want to generate (URL, Text, Email, etc.).

2. **Fill in the Form:**
   - Depending on the selected type, fill in the necessary information (e.g., URL, Email Address, WiFi credentials).

3. **Customize Colors:**
   - Pick your preferred foreground and background colors for the QR code.

4. **Generate QR Code:**
   - Click the "Generate QR Code" button to create the QR code.

5. **Download the QR Code:**
   - You can download the QR code in PNG, SVG, or JPEG formats using the download options.
