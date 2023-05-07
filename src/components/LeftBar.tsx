import { Link } from "react-router-dom";
import {
  AiFillHome,
  AiFillBell,
  AiOutlineUser,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import { BsFillEnvelopeFill, BsFillBookmarkFill } from "react-icons/bs";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { useUser } from "@clerk/clerk-react";
import { useModal } from "../store/modalStore";

export default function LeftBar() {
  const { handleModalState } = useModal();

  const { isSignedIn } = useUser();
  const data = [
    {
      id: 1,
      icon: <AiFillHome className="text-base" />,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      icon: <FaHashtag className="text-base" />,
      text: "Explore",
      link: "/",
    },
    {
      id: 3,
      icon: <AiFillBell className="text-base" />,
      text: "Notifications",
      link: "/",
    },
    {
      id: 4,
      icon: <BsFillEnvelopeFill className="text-base" />,
      text: "Messages",
      link: "/",
    },
    {
      id: 5,
      icon: <BsFillBookmarkFill className="text-base" />,
      text: "Bookmarks",
      link: "/",
    },
    {
      id: 6,
      icon: <AiOutlineUser className="text-base" />,
      text: "Profile",
      link: "/profile",
    },
    {
      id: 7,
      icon: <HiOutlineDotsCircleHorizontal className="text-base" />,
      text: "More",
      link: "/",
    },
  ];
  return (
    <div className="w-1/5 xl:w-1/4 h-[85vh] border-r border-gray-300 p-2 pl-0 flex flex-col justify-between">
      <div className="flex flex-col gap-5 items-center xl:items-start">
        {data.map(({ id, icon, text, link }) => (
          <Link className="flex items-center gap-2" to={link} key={id}>
            {icon}
            <p className="hidden xl:inline">{text}</p>
          </Link>
        ))}
      </div>
      {isSignedIn && (
        <button
          className="w-full py-2 bg-[#212121] text-[#f0f0f0] rounded-full grid place-items-center"
          onClick={handleModalState}
        >
          <span className="hidden xl:inline">Post</span>
          <AiOutlinePlus className="xl:hidden" />
        </button>
      )}
    </div>
  );
}
