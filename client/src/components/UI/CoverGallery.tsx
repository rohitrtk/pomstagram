import { Carousel } from "@material-tailwind/react";

const images: string[] = [
  "http://localhost:3001/public/cover1.jpeg",
  "http://localhost:3001/public/cover2.jpeg",
  "http://localhost:3001/public/cover3.jpeg"
];

const CoverGallery = () => {
  const dummy = () => <></>;

  return (
    <Carousel
      className="rounded-sm shadow-md"
      autoplay={true}
      loop={true}
      nextArrow={dummy}
      prevArrow={dummy}
      navigation={dummy}>
      {images.map((image, index) => (
        <img
          src={image}
          alt={`cover-image-${index}`}
          key={index}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
};

export default CoverGallery;
