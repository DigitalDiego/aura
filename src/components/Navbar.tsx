import { useUser, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <div className="w-full h-[15vh] flex justify-between items-center border-b border-gray-300 px-[5vw] xl:px-[15vw] 2xl:px-[25vw]">
      <Link className="text-4xl font-lobster" to="/">
        aura
      </Link>
      <nav>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <button className="w-8 h-8 rounded-full bg-gray-200 grid place-items-center">
              <AiOutlineUser />
            </button>
          </SignInButton>
        )}
      </nav>
    </div>
  );
}
