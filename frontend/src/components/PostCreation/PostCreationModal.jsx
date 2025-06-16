import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createPost, getUserIdFromCookie } from "../../services/postService";
import { getUserById } from "../../services/authService";
function PostCreationModal({ onClose, onPostCreated }) {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState("");
  const [errorContent, setErrorContent] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  async function handleSubmit() {
    const userId = await getUserIdFromCookie();
    console.log("user id", userId);
    setErrorContent("");

    if (content.trim().length === 0) {
      setErrorContent("Your post is empty");
      return;
    }

    const newPost = {
      content,
      created_at: new Date().toISOString(),
      id_profile: userId || "Unknown",
    };

    const createdPost = await createPost(newPost);
    onPostCreated(createdPost.newPost);
    handleClose();
  }

  const modal = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#1F1F1F] text-white p-6 rounded-xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-xl ring-2 ring-[#ff6600] transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <textarea
          placeholder="Write something here..."
          className="w-full h-40 p-3 rounded bg-[#1F1F1F] text-white font-roboto text-base resize-none outline-none"
          value={content}
          maxLength={280}
          onChange={(e) => setContent(e.target.value)}
        />
        {errorContent && (
          <p className="text-red-500 text-sm mt-1">{errorContent}</p>
        )}
        <div className="flex justify-center mt-4 gap-7">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-transparent ring-2 ring-[#ff6600] hover:bg-[#ff6600]"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#ff6600] ring-2 ring-[#ff6600] hover:bg-transparent"
          >
            Yeet !
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default PostCreationModal;
