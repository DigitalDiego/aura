import { PostType } from "../types";
import { Link } from "react-router-dom";

export default function Post(props: PostType) {
  return (
    <Link className="w-full" to={`/posts/${props?._id}`}>
      <div className="w-full h-[200px] rounded-lg overflow-hidden relative group">
        <div className="w-full h-full absolute top-0 right-0 flex justify-start items-start p-2 opacity-0 group-hover:opacity-100 duration-[.5s] bg-[#212121]/50">
          <Link to={`/users/${props?.userId}`}>
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={props?.avatar}
              alt={props?.user}
            />
          </Link>
        </div>
        <img
          className="w-full h-full object-cover"
          src={props?.image}
          alt={`Image by ${props?.user}`}
        />
      </div>
    </Link>
  );
}
