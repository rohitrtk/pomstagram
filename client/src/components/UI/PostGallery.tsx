import { Spinner } from "@material-tailwind/react";

import PostCard from "./PostCard";
import { Post } from "@/state";

interface Props {
  posts: Post[] | null;
}

const PostGallery = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="md:grid md:grid-cols-4 md:gap-5 flex flex-col gap-1 h-full overflow-x-hidden overflow-y-scroll p-5">
      {posts ? (
        <>
          {[...Array(4).keys()].map((i) => (
            <div key={i} className="flex flex-col">
              {posts
                .filter((value, j) => j % 4 === i)
                .map((post, j) => (
                  <div key={j} className="pb-5">
                    <PostCard {...post} />
                  </div>
                ))}
            </div>
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PostGallery;
