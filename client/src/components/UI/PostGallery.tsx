import { Spinner } from "@material-tailwind/react";

import PostCard from "./PostCard";
import { IPost } from "@/state";

interface Props {
  posts: IPost[] | null;
}

const PostGallery = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-5 h-full overflow-x-hidden overflow-y-scroll">
      {posts ? (
        posts.map((post, i) => {
          return (
            <div key={i}>
              <PostCard {...post} />
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PostGallery;
