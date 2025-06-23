import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { editPost } from "../services/postService";
import { getUserById, getUserIdFromCookie } from "../services/authService";

function ProfilePostEditModal({ id_post, initialText, onClose, onPostEdited }) {
  const [text, setText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

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
    if (text.trim().length === 0) {
      setErrorContent("Your post is empty");
      return;
    }
    try {
      editPost(id_post, text);
      onPostEdited({ text });
    } catch (error) {
      console.error(
        "Failed to edit post:",
        error.response?.data || error.message
      );
    }

    // const newPost = {
    //   content,
    //   created_at: new Date().toISOString(),
    //   id_profile: userId || "Unknown",
    // };

    // const createdPost = await createPost(newPost);
    // onPostCreated(createdPost.newPost);
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
        className={`bg-white dark:bg-[#1F1F1F] p-6 rounded-xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-xl ring-2 ring-[#ff6600] transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-3 rounded bg-white dark:bg-[#1F1F1F] font-roboto text-base resize-none outline-none"
          maxLength={280}
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
            Eyeet !
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default ProfilePostEditModal;
