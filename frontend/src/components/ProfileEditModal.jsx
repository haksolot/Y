import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

function ProfileEditModal({
  onClose,
  displayName,
  username,
  bio,
  avatarColor,
}) {
  const fileInputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(null);

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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const modal = (
    <div
      className={`fixed inset-0 z-50 gap-4 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1F1F1F] gap-4 flex flex-col text-white p-6 rounded-xl w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-xl ring-2 ring-[#ff6600]"
      >
        <div
          className="w-16 h-16 rounded-xl ring-2 ring-[#ff6600] cursor-pointer overflow-hidden"
          onClick={handleAvatarClick}
        >
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <div className={`${avatarColor} w-full h-full`} />
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <textarea
          defaultValue={displayName}
          className="text-lg font-bold h-auto w-auto p-2 bg-[#1F1F1F] text-white resize-none border border-[#ff6600] rounded-lg"
        />
        <div className="text-sm text-[#ffffff88]">{username}</div>
        <textarea
          defaultValue={bio}
          className="w-full h-24 p-2 bg-[#1F1F1F] text-white resize-none border border-[#ff6600] rounded-lg"
        />
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-transparent ring-2 ring-[#ff6600] hover:bg-[#ff6600]"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#ff6600] ring-2 ring-[#ff6600] hover:bg-transparent">
            Save
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default ProfileEditModal;
