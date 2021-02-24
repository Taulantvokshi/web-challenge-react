import React, { useState, lazy, Suspense } from 'react';

import Notifications from './components/Header';
import Credit from './components/Credit';
import FullScreen from './components/Fullscreen';
import Modal from './components/Modal.js';
import './App.css';
const MainContent = lazy(() => import('./components/gallery/index'));

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);

  const handleFullScreen = (imageUrl, petName) => {
    setFullScreen(true);
    setModalImage({ imageUrl, petName });
  };

  const handleCloseFullScreen = () => {
    setFullScreen(false);
  };

  const selectImage = (
    imageUrl,
    imageTitle,
    index,
    imageWraperClass,
    infAnimation,
    expAnimation
  ) => {
    const isDuplicated = selectedImages.find((item) => {
      return item.image === imageUrl;
    });
    const selectButton = document.querySelector(`.selectButton-${index}`);

    if (isDuplicated) {
      setSelectedImages((prew) =>
        prew.filter((item) => item.image !== imageUrl)
      );
      selectButton.style.opacity = 0;
      setSelectedCount((prew) => (prew -= 1));
    } else {
      selectButton.style.opacity = 1;
      setSelectedImages((prew) => [
        ...prew,
        {
          image: imageUrl,
          name: imageTitle,
          imageClass: imageWraperClass,
          infAnimation,
          expAnimation,
        },
      ]);
      setSelectedCount((prew) => (prew += 1));
    }
  };

  return (
    <div className="theApp">
      <Modal isOpen={fullScreen}>
        <FullScreen data={modalImage} onClose={handleCloseFullScreen} />
      </Modal>

      <div className="main-container">
        <Notifications
          setSelectedImages={setSelectedImages}
          setSelectedCount={setSelectedCount}
          selectedCount={selectedCount}
          selectedImages={selectedImages}
        />

        <Suspense
          fallback={
            <div className="fallback">
              <img
                className="fallback-image"
                src="images/Loader.gif"
                alt="loader"
              />
            </div>
          }
        >
          <MainContent
            selectedImages={selectImage}
            allSelectImages={selectedImages}
            handleFullScreen={handleFullScreen}
          />
        </Suspense>

        <Credit />
      </div>
    </div>
  );
}

export default App;
