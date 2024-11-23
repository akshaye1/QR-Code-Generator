import React, { useState } from "react";
import './App.css'

function App() {
  const [inputURL, setInputURL] = useState(""); // State for user-entered URL
  const [qrCodeURL, setQrCodeURL] = useState(""); // State for generated QR code

  // Generate QR Code
  const generateQRCode = () => {
    const url = inputURL.trim() || window.location.href; // Use input URL or current page URL
    const qrCodeAPI = `https://quickchart.io/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(url)}&choe=UTF-8`;
    setQrCodeURL(qrCodeAPI);
  };

  // Copy URL to Clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputURL.trim() || window.location.href);
    alert("URL copied to clipboard!");
  };

  // Download QR Code
  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.setAttribute('target', '_blank');
    link.href = qrCodeURL;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4 dark:bg-slate-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        URL QR Code Generator
      </h1>

      {/* Input Field for Custom URL */}
      <input
        type="text"
        placeholder="Enter a URL or leave empty for current page"
        value={inputURL}
        onChange={(e) => setInputURL(e.target.value)}
        className="w-96 p-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Generate Button */}
      <button
        onClick={generateQRCode}
        className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Generate QR Code
      </button>

      {qrCodeURL && (
        <div className="mt-6">
          {/* QR Code Image */}
          <img
            src={qrCodeURL}
            alt="QR Code"
            className="w-45 h-45 mx-auto border-4 border-gray-300 rounded-md"
          />

          {/* Action Buttons */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={copyToClipboard}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Copy URL
            </button>
            <button
              onClick={downloadQRCode}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
