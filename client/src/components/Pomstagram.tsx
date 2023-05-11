import { Typography } from "@material-tailwind/react";

interface Props {
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "paragraph" | "small";
  fancy?: boolean;
}

const Pomstagram = ({ size, fancy }: Props) => {
  return (
    <Typography
      variant={size ? size : "h1"}
      className={`font-bold 
      font-secondary
      text-transparent
      pb-2
      bg-clip-text 
      bg-gradient-to-r 
      from-purple-700 
      via-pink-600 
      via-33% 
      via-orange-500 
      via-66% 
      to-yellow-500`}>
      Pomstagram
    </Typography>
  );
};

export default Pomstagram;
