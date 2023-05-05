import Link from "next/link";
import { Avatar } from "@material-tailwind/react";

interface Props {
  userPicturePath: string;
  userName: string;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  noLink?: boolean;
}

const UserIcon = ({
  userPicturePath,
  userName,
  size,
  noLink = false
}: Props) => {
  if (noLink) {
    return <Avatar variant="circular" src={userPicturePath} size={size} />;
  }

  return (
    <Link href={`http://localhost:3000/profile/${userName}`}>
      <Avatar variant="circular" src={userPicturePath} size={size} />
    </Link>
  );
};

export default UserIcon;
