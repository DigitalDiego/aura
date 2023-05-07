import { Routes, Route } from "react-router-dom";
import { Main, Post, User, Profile } from "./pages";
import { Navbar, LeftBar, Modal } from "./components";
import { useModal } from "./store/modalStore";

export default function App() {
  const { modalState } = useModal();

  return (
    <>
      <Navbar />
      <div className="w-full flex px-[5vw] xl:px-[15vw] 2xl:px-[25vw]">
        <LeftBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {modalState && <Modal />}
    </>
  );
}
