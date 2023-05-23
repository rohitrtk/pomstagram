import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";
import UserIcon from "./UserIcon";

interface Props {
  userName: string;
  userPicturePath: string;
  numLikes: number;
  numPosts: number;
}

const UserCard = ({ userName, userPicturePath, numLikes, numPosts }: Props) => {
  return (
    <Card className="rounded-sm flex flex-wrap lg:w-1/4 w-2/3 p-5">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex flex-col justify-center items-center">
        <UserIcon
          size="xxl"
          noLink={true}
          userName={userName}
          userPicturePath={`http://localhost:3001/public/${userPicturePath}`}
        />
        <Typography className="text-center font-bold">{userName}</Typography>
      </CardHeader>
      <CardBody className="flex flex-row gap-5 justify-center items-center">
        <div className="flex flex-col text-center">
          <Typography className="font-bold">Posts</Typography>
          <Typography>{numPosts}</Typography>
        </div>
        <div className="flex flex-col text-center">
          <Typography className="font-bold">Likes</Typography>
          <Typography>{numLikes}</Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserCard;
