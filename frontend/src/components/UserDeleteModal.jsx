import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { deletePost, deletePostByIdProfile } from "../services/postService";
import { deleteUser } from "../services/authService";
import { deleteCommentByIdProfile } from "../services/postService";
import { deleteProfile, getProfileByUserId } from "../services/profileService";

function ProfilePostDeleteModal({ onClose, onDelete, id_user }) {
  const [isVisible, setIsVisible] = useState(false);

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

  const handleDelete = async () => {
    await deleteUser(id_user);
    const profile = await getProfileByUserId(id_user);
    await deletePostByIdProfile(profile._id);
    await deleteCommentByIdProfile(profile._id);
    await deleteProfile(id_user);
    onDelete?.(id_user);
    handleClose();
  };

  const modal = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-[#1F1F1F] ring-2 ring-[#ff6600] p-6 rounded-xl shadow-xl transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        } max-w-[90vw] min-w-[300px] h-auto overflow-y-auto scrollbar `}
      >
        <h2 className="text-base font-koulen mb-4 py-4  md:text-2xl">
          Are you sure you want to yeeyeet this yolo ?
        </h2>
        <div className="flex justify-center mt-4 gap-7">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-base rounded-lg bg-transparent ring-2 ring-[#ff6600] hover:bg-[#ff6600]"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleDelete}
            className="px-4 py-2 text-base rounded-lg bg-[#ff6600] ring-2 ring-[#ff6600] hover:bg-transparent"
          >
            Yes !
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default ProfilePostDeleteModal;
