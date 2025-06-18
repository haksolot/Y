import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { handleSaveProfile } from "../services/profileService";

function ProfileEditModal({ onClose, onProfileUpdated, displayName, username, bio, avatar }) {
  const fileInputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState(displayName);
  const [description, setDescription] = useState(bio);
  const [avatarBase64, setAvatarBase64] = useState(null);

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
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result; 
        setPreview(base64Image); 
        setAvatarBase64(base64Image);
      };

      reader.readAsDataURL(file);
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
            <img src={avatar} className="w-full h-full object-cover" />
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
          onChange={(e) => setName(e.target.value)}
        />
        <div className="text-sm text-[#ffffff88]">@{username}</div>
        <textarea
          defaultValue={bio}
          className="w-full h-24 p-2 bg-[#1F1F1F] text-white resize-none border border-[#ff6600] rounded-lg"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-transparent ring-2 ring-[#ff6600] hover:bg-[#ff6600]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSaveProfile(name, description, avatarBase64);
              onProfileUpdated({
                name,
                description,
                avatar: preview || avatar,
              });
              handleClose();
            }}
            className="px-4 py-2 rounded-lg bg-[#ff6600] ring-2 ring-[#ff6600] hover:bg-transparent"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default ProfileEditModal;
