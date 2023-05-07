import { useEffect } from "react";
import { client } from "../utils";
import { getUserPosts } from "../api";
import Masonry from "react-masonry-css";
import { Post, Loader } from "../components";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../types";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["userPosts"],
    queryFn: () => client.fetch(getUserPosts(user?.id)),
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
    <div className="w-3/4 p-2 pr-0 flex flex-col gap-4 overflow-y-scroll no-scrollbar">
      <div className="w-full h-[10vh] flex justify-start items-center gap-1">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={data[0]?.avatar}
          alt={data[0]?.user}
        />
        <p className="font-poppinsSemiBold">{data[0]?.user}</p>
      </div>
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
