import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap/gsap-core';
import { CSSPlugin } from 'gsap/CSSPlugin';
const ImageCard = ({
  imageUrl,
  imageDescription,
  imageTitle,
  index,
  selectedImages,
  allSelectImages,
  handleFullScreen,
}) => {
  const imageRef = useRef();

  const [spans, setSpans] = useState(0);
  const [infAnimation, setInfAnimation] = useState();
  const [expAnimation, setExpAnimation] = useState();

  useEffect(() => {
    imageRef.current.style.opacity = '0';
    imageRef.current.addEventListener('load', (e) => {
      const height = imageRef.current.clientHeight + 20;
      const sp = Math.ceil(height / 10);
      setSpans(sp);
      imageRef.current.style.opacity = 1;
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(CSSPlugin);
    const infoAnimation = gsap
      .timeline()
      .to(`.hiddenDescription-${index}`, { opacity: 1, y: 0 })
      .to(`.hiddenTitle-${index}`, { opacity: 1, y: 0 }, 0);
    const expandAnimation = gsap
      .timeline()
      .to(
        `.expand-image-wrap-${index}`,
        { duration: 0.3, opacity: 1, x: 0 },
        0
      );

    infoAnimation.pause();
    expandAnimation.pause();
    setInfAnimation(infoAnimation);
    setExpAnimation(expandAnimation);
  }, [index]);

  const onMouseEnter = () => {
    imageRef.current.style.filter = 'brightness(60%)';
    imageRef.current.style.transform = 'scale(1.02)';
    if (infAnimation) {
      infAnimation.play();
      expAnimation.play();
    }
  };
  const onMouseLeave = (e) => {
    const isDuplicated = allSelectImages.find(
      (item) => item.image === imageRef.current.src
    );
    if (!isDuplicated) {
      imageRef.current.style.transform = 'scale(1)';
      imageRef.current.style.filter = 'brightness(100%)';
      infAnimation.reverse();
    }
    expAnimation.reverse();
  };
  const imageWraperClass = `imageWraper-${index}`;
  return (
    <div
      onClick={() =>
        selectedImages(
          imageUrl,
          imageTitle,
          index,
          imageWraperClass,
          infAnimation,
          expAnimation
        )
      }
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ gridRowEnd: `span ${spans}` }}
      className={`imageWraper ${imageWraperClass}`}
    >
      <img ref={imageRef} className="imageTag" src={imageUrl} alt="animal" />
      <div className={`hiddenTitle hiddenTitle-${index}`}>{imageTitle}</div>
      <div className={`hiddenDescription hiddenDescription-${index}`}>
        {imageDescription}
      </div>
      <div className={`selectButton selectButton-${index}`}>
        <img
          className="selectButtonImage"
          src="images/checked.svg"
          alt="checked icon"
        />
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleFullScreen(imageUrl, imageTitle);
        }}
        className={`expand-image-wrap expand-image-wrap-${index}`}
      >
        <img
          className="expand-image"
          src="images/full-screen.svg"
          alt="expand icon"
        />
      </div>
    </div>
  );
};

export default ImageCard;
