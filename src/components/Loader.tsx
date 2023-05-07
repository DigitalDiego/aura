import { AiOutlineLoading } from "react-icons/ai";

export default function Loader() {
  return (
    <div className="w-3/4 h-[85vh] grid place-items-center">
      <AiOutlineLoading className="animate-spin" />
    </div>
  );
}
