import { getPosts } from "../api";
import { useQuery } from "@tanstack/react-query";
import Masonry from "react-masonry-css";
import { Post, Loader } from "../components";
import { client } from "../utils";
import { PostType } from "../types";

export default function Main() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => client.fetch(getPosts()),
  });

  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  if (isLoading) return <Loader />;
  if (error) return <div>error</div>;
  return (
    <div className="w-4/5 xl:w-3/4 min-h-[85vh] p-2 xl:pr-0">
      <Masonry
        className="w-full flex gap-2"
        breakpointCols={breakpointColumnsObj}
      >
        {data?.map((post: PostType) => (
          <Post key={post?._id} {...post} />
        ))}
      </Masonry>
    </div>
  );
}
