import { MouseEventHandler } from "react";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "http://localhost:3001/public/cover1.jpeg"
  },
  {
    original: "http://localhost:3001/public/cover2.jpeg"
  },
  {
    original: "http://localhost:3001/public/cover3.jpeg"
  }
];

const startIndex = Math.floor(Math.random() * images.length);

const CoverGallery = () => {
  const renderFunction = (
    onClick: MouseEventHandler<HTMLElement>,
    isPlaying: boolean
  ) => <></>;

  return (
    <div className="">
      <ImageGallery
        additionalClass="custom-gallery"
        startIndex={startIndex}
        items={images}
        infinite={true}
        autoPlay={true}
        disableKeyDown={true}
        disableSwipe={true}
        disableThumbnailScroll={true}
        renderFullscreenButton={renderFunction}
        renderLeftNav={renderFunction}
        renderRightNav={renderFunction}
        renderPlayPauseButton={renderFunction}
      />
    </div>
  );
};

export default CoverGallery;
