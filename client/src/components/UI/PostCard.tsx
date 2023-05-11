import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import UserIcon from "./UserIcon";
import { IPost, IState, IUser, setPost } from "@/state";

interface Props extends IPost {
  link?: boolean;
}

const PostCard = ({
  picturePath,
  description,
  likes,
  _id,
  userPicturePath,
  userName,
  link = true
}: Props) => {
  const dispatch = useDispatch();

  const token = useSelector<IState, string | null>((state) => state.token);
  const user = useSelector<IState, IUser | null>((state) => state.user);

  const [isLiked, setIsLiked] = useState(
    Boolean(user ? likes[user._id] : false)
  );

  const likePost = async () => {
    if (!user) return;

    const res = await fetch(`http://localhost:3001/posts/${_id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user._id
      })
    });

    const updatedPost: IPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
    setIsLiked(Boolean(updatedPost.likes[user._id]));
  };

  return (
    <Card className="rounded-sm flex flex-wrap overflow-hidden">
      <CardHeader
        floated={false}
        shadow={true}
        color="transparent"
        className="m-0 rounded-none">
        <Link
          className={link ? "cursor-pointer" : "cursor-none"}
          href={
            link ? `http://localhost:3000/profile/${user!.userName}/${_id}` : ""
          }>
          <img src={`http://localhost:3001/public/${picturePath}`} />
        </Link>
      </CardHeader>
      <CardBody className="p-1 justify-between flex flex-row items-center mx-1">
        <div className="flex flex-row gap-1">
          <UserIcon
            size="xs"
            userName={userName}
            userPicturePath={`http://localhost:3001/public/${userPicturePath}`}
          />
          <Typography>{description}</Typography>
        </div>
        {user ? (
          <FontAwesomeIcon
            icon={isLiked ? faHeartSolid : faHeartRegular}
            className="cursor-pointer"
            onClick={likePost}
          />
        ) : (
          <></>
        )}
      </CardBody>
    </Card>
  );
};

export default PostCard;
