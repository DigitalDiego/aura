import { useState } from "react";
import { useModal } from "../store/modalStore";
import {
  AiOutlinePlus,
  AiOutlineLoading,
  AiOutlineUpload,
} from "react-icons/ai";
import { client } from "../utils";
import { BsFillTrash2Fill } from "react-icons/bs";
import { useUser } from "@clerk/clerk-react";

export default function Modal() {
  const [caption, setCaption] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleModalState } = useModal();
  const { user } = useUser();

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          setImageAsset(document?.url);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const createPost = async () => {
    const doc = {
      _type: "post",
      image: imageAsset,
      caption: caption,
      user: `${user?.firstName} ${user?.lastName ? user?.lastName : ""}`,
      avatar: user?.profileImageUrl,
      userId: user?.id,
    };

    await client.create(doc).then(() => {
      window.location.reload();
    });
  };
  return (
    <div className="fixed top-0 right-0 w-full h-screen bg-[#212121] text-[#f0f0f0]">
      <div className="w-full h-[15vh] flex justify-end items-center px-[5vw] xl:px-[15vw] 2xl:px-[25vw]">
        <button
          className="w-8 h-8 rounded-full bg-[#f0f0f0] text-[#212121] grid place-items-center"
          onClick={handleModalState}
        >
          <AiOutlinePlus className="rotate-45" />
        </button>
      </div>
      <div className="w-full h-[85vh] px-[5vw] xl:px-[15vw] 2xl:px-[25vw] flex xl:flex-row flex-col-reverse gap-2 pb-2 justify-center items-center">
        <div className="w-full xl:w-1/2 h-full 2xl:h-[50vh] flex flex-col gap-2">
          <textarea
            className="w-full grow bg-[#f0f0f0]/10 p-2 rounded-lg resize-none outline-none"
            placeholder="Caption"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          ></textarea>
          <button
            className="w-full py-2 bg-[#f0f0f0] text-[#212121] rounded-full disabled:opacity-50"
            disabled={caption.replace(/\s/g, "").length === 0 || !imageAsset}
            onClick={createPost}
          >
            Post
          </button>
        </div>
        <div className="w-full xl:w-1/2 h-full 2xl:h-[50vh] rounded-lg border border-[#f0f0f0]/10">
          {!imageAsset && !loading ? (
            <label className="w-full h-full grid place-items-center">
              <AiOutlineUpload />
              <input
                className="w-0 h-0 absolute"
                type="file"
                onChange={uploadImage}
              />
            </label>
          ) : loading ? (
            <div className="w-full h-full grid place-items-center">
              <AiOutlineLoading className="animate-spin" />
            </div>
          ) : (
            imageAsset && (
              <div className="w-full h-full grid place-items-center relative">
                <button
                  className="absolute top-2 right-2 w-8 h-8 rounded-full text-red-400"
                  onClick={() => setImageAsset(null)}
                >
                  <BsFillTrash2Fill />
                </button>
                <img
                  className="h-[50vh] 2xl:h-[40vh] object-contain"
                  src={imageAsset}
                  alt="image uploaded"
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
