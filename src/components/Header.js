import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap/gsap-core';
import { CSSPlugin } from 'gsap/CSSPlugin';

import './Header.css';

const Notifications = ({
  selectedImages,
  selectedCount,
  setSelectedImages,
  setSelectedCount,
}) => {
  const counterRef = useRef();
  const [downloadedLength, setDownloadedLength] = useState(0);
  useEffect(() => {
    if (selectedCount > 0) {
      counterRef.current.style.opacity = '1';
    }
  }, [selectedCount]);

  const fetchLoop = async (_) => {
    const promises = selectedImages.map(async (imageSource) => {
      const a = document.createElement('a');
      a.style.display = 'none';
      const data = await fetch(imageSource.image, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      const blob = await data.blob();
      const fileName = `${imageSource.name}.${blob.type.split('/')[1]}`;
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      imageSource.infAnimation.reverse();
      imageSource.expAnimation.reverse();
      return [`${imageSource.name}.${blob.type.split('/')[1]}`];
    });

    const downloadEnd = await Promise.all(promises);
    setDownloadedLength(downloadEnd.length);
    gsap.registerPlugin(CSSPlugin);
    const confirmAnimation = gsap
      .timeline()
      .to('.space', { opacity: 1, x: 0, ease: 'back' });
    setTimeout(() => {
      confirmAnimation.reverse();
    }, 3000);
    setSelectedImages([]);
    setSelectedCount(0);
    counterRef.current.style.opacity = '0';
  };

  const handleDownloads = () => {
    if (selectedImages.length) {
      fetchLoop();
    }
  };

  return (
    <div className="main-notifications">
      <div className="options">
        <div onClick={handleDownloads} className="options-download">
          <div className="options-download-wrap">
            <div ref={counterRef} className="selected-images">
              {selectedCount}
            </div>
            <img src="images/download.svg" alt="down-arrow" />
          </div>
          <div>Download</div>
        </div>
      </div>
      <div className="logo">cuteness overload</div>
      <div className="space">
        <div className="space-confirm">{`${downloadedLength} ${
          downloadedLength > 1 ? 'Images Downloaded' : 'Image Downloaded'
        }`}</div>
      </div>
    </div>
  );
};
export default Notifications;
