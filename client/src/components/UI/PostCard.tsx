import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faHeartCrack
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { IPost, IState, IUser, setPost } from "@/state";

interface Props {
  post: IPost;
}

const PostCard = ({ picturePath, description, likes, _id }: IPost) => {
  //const { picturePath, description, likes, _id } = post;

  const dispatch = useDispatch();

  const token = useSelector<IState, string | null>((state) => state.token);
  const user = useSelector<IState, IUser | null>((state) => state.user);

  const isLiked = Boolean(user ? likes[user._id] : false);

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

    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <Card className="rounded-sm flex flex-wrap overflow-hidden">
      <CardHeader
        floated={false}
        shadow={true}
        color="transparent"
        className="m-0 rounded-none">
        <img src={`http://localhost:3001/public/${picturePath}`} />
      </CardHeader>
      <CardBody className="p-1 justify-between flex flex-row items-center">
        <Typography>{description}</Typography>
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
