import { getPost } from "../api";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { client } from "../utils";
import moment from "moment";
import { Loader } from "../components";

export default function Post() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: () => client.fetch(getPost(id)),
  });

  if (isLoading) return <Loader />;
  if (error) return <div>error</div>;
  return (
    <div className="w-3/4 h-[85vh] overflow-y-scroll no-scrollbar p-2 pr-0 flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <Link to={`/users/${data[0]?.userId}`}>
          <div className="flex items-center gap-1">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={data[0]?.avatar}
              alt={data[0]?.user}
            />
            <p className="font-poppinsSemiBold">{data[0]?.user}</p>
          </div>
        </Link>
        <p className="opacity-50">{moment(data[0]?._createdAt).fromNow()}</p>
      </div>
      <div className="w-full grid place-items-center">
        <img
          className="h-[50vh] object-contain rounded-lg"
          src={data[0]?.image}
          alt="post image"
        />
      </div>
      <p>{data[0]?.caption}</p>
    </div>
  );
}
