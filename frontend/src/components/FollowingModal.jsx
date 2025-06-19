import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getUserIdFromCookie } from "../services/authService";
import { getProfileByUserId, getProfileById } from "../services/profileService";
import Follow from "./Follow";
function FollowingModal({ onClose }) {
  const [followings, setFollowing] = useState([]);
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

  useEffect(() => {
    async function getFollowing() {
      const userId = await getUserIdFromCookie();
      const data = await getProfileByUserId(userId);
      const following_user = data.following;
      const infoFollo = await Promise.all(
        following_user.map(async (followingId) => {
          const profile = await getProfileById(followingId);
          console.log("Profil récupéré:", profile);
          return profile;
        })
      );

      console.log(infoFollo);
      setFollowing(infoFollo);
    }
    getFollowing();
  }, []);

  const modal = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#1F1F1F] ring-2 ring-[#ff6600] text-white p-6 rounded-xl shadow-xl transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        } max-w-[90vw] min-w-[300px] h-auto overflow-y-auto scrollbar`}
      >
        <h2 className="text-2xl font-koulen mb-4 text-[#ff6600]">Yolowing</h2>
        <ul className="max-h-64 overflow-y-auto">
          {followings.map((following) => (
            <li
              key={following.id}
              className="flex pl-2 pr-2 items-center gap-4 py-3"
            >
              {following.avatar}
              <div
                className="w-10 h-10 rounded-xl"
                style={{ backgroundColor: "#888" }}
              />
              <span className="text-white font-koulen text-base">
                {following.display_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default FollowingModal;
