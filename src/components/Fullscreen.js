import React from 'react';
import './Fullscreen.css';
const FullScreen = ({ data, onClose }) => {
  const handleDownload = async () => {
    const a = document.createElement('a');
    a.style.display = 'none';
    const response = await fetch(data.imageUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
    const blob = await response.blob();
    const fileName = `${data.petName}.${blob.type.split('/')[1]}`;
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fullscreen">
      <img
        className="fullscreen-image"
        style={{ width: '50vw' }}
        src={data.imageUrl}
        alt="pet"
      />
      <div onClick={onClose} className="fullscreen-close">
        <img
          className="fullscreen-close-image"
          alt="pet"
          src="images/cancel.svg"
        />
      </div>

      <div onClick={handleDownload} className="fullscreen-download">
        <img
          className="fullscreen-download-image"
          alt="pet"
          src="images/download.svg"
        />
      </div>
    </div>
  );
};

export default FullScreen;
