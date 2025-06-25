import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { createPost } from "../../services/postService";
import { getProfileByUserId } from "../../services/profileService";
import { getUserIdFromCookie } from "../../services/authService";
import imageCompression from "browser-image-compression";
function PostCreationModal({ onClose, onPostCreated }) {
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState("");

  const [content, setContent] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const fileInputRef = useRef(null);

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
    console.log("avatarBase64", avatarBase64);
    const userId = await getUserIdFromCookie();
    const profile = await getProfileByUserId(userId);
    setErrorContent("");

    if (content.trim().length === 0) {
      setErrorContent("Your post is empty");
      return;
    }
    const newPost = {
      content,
      image: avatarBase64,
      created_at: new Date().toISOString(),
      id_profile: profile._id || "Unknown",
    };
    console.log("newPost", newPost);
    const createdPost = await createPost(newPost);
    if(createdPost.error) setErrorContent(createdPost.error);
    onPostCreated(createdPost.newPost);
    handleClose();
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const options = {
        maxSizeMB: 0.1, // 100 Ko
        maxWidthOrHeight: 300, // Taille réduite (300x300 max)
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64Image = reader.result;
          setPreview(base64Image);
          setAvatarBase64(base64Image);
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error(
          "Erreur pendant la compression ou lecture de l'image :",
          error
        );
      }
    }
  };

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
          placeholder="Write something here..."
          className="w-full h-40 p-3 rounded bg-white dark:bg-[#1F1F1F] font-roboto text-base resize-none outline-none"
          value={content}
          maxLength={280}
          onChange={(e) => setContent(e.target.value)}
        />
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-64 rounded-lg object-contain mx-auto"
            />
          </div>
        )}
        {errorContent && (
          <p className="text-red-500 text-sm mt-1">{errorContent}</p>
        )}
        <div className="relative mt-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <svg
              onClick={handleAvatarClick}
              className="w-6 h-6 cursor-pointer"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8.625C0 5.45352 2.57852 2.875 5.75 2.875H40.25C43.4215 2.875 46 5.45352 46 8.625V37.375C46 40.5465 43.4215 43.125 40.25 43.125H5.75C2.57852 43.125 0 40.5465 0 37.375V8.625ZM29.0914 18.1934C28.6871 17.6004 28.0223 17.25 27.3125 17.25C26.6027 17.25 25.9289 17.6004 25.5336 18.1934L17.7172 29.6574L15.3363 26.6836C14.923 26.1715 14.3031 25.875 13.6562 25.875C13.0094 25.875 12.3805 26.1715 11.9762 26.6836L6.22617 33.8711C5.70508 34.518 5.60625 35.4074 5.96563 36.1531C6.325 36.8988 7.07969 37.375 7.90625 37.375H16.5312H19.4062H38.0938C38.8934 37.375 39.6301 36.9348 39.9984 36.225C40.3668 35.5152 40.3219 34.6617 39.8727 34.0059L29.0914 18.1934ZM10.0625 17.25C11.2062 17.25 12.3031 16.7956 13.1119 15.9869C13.9206 15.1781 14.375 14.0812 14.375 12.9375C14.375 11.7938 13.9206 10.6969 13.1119 9.8881C12.3031 9.07935 11.2062 8.625 10.0625 8.625C8.91875 8.625 7.82185 9.07935 7.0131 9.8881C6.20435 10.6969 5.75 11.7938 5.75 12.9375C5.75 14.0812 6.20435 15.1781 7.0131 15.9869C7.82185 16.7956 8.91875 17.25 10.0625 17.25Z"
                fill="#FF6600"
              />
            </svg>
          </div>
          <div className="flex justify-center gap-7">
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
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default PostCreationModal;
