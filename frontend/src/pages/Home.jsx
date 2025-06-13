import { useState } from "react";
import Post from "../components/Post.jsx";
import PostCreationButton from "../components/PostCreation/PostCreation.jsx";
import PostCreationModal from "../components/PostCreation/PostCreationModal.jsx";

function Home() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <>
      <PostCreationButton
        onClick={() => setIsPostModalOpen(true)}
        className="z-20 h-8 fixed left-1/2 -translate-x-1/2 bottom-28 w-100"
      />

      {isPostModalOpen && (
        <PostCreationModal onClose={() => setIsPostModalOpen(false)} />
      )}
      <div className="flex flex-col items-center gap-14 pt-24 pb-32 min-h-screen overflow-y-auto sm:w-3/4 md:w-3/5">
        <Post className="w-3/4" />
        <Post className="w-3/4" />
        <Post className="w-3/4" />
        <Post className="w-3/4" />
        <Post className="w-3/4" />
        <Post className="w-3/4" />
        <Post className="w-3/4" />
        <Post className="w-3/4" />
      </div>
    </>
  );
}

export default Home;
