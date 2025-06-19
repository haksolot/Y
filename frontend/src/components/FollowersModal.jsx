import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getUserIdFromCookie } from "../services/authService";
import { getProfileByUserId, getProfileById } from "../services/profileService";
import Follow from "./Follow";
function FollowersModal({ onClose }) {
  const [followers, setFollowers] = useState([]);
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
    async function getFollowers() {
      const userId = await getUserIdFromCookie();
      const data = await getProfileByUserId(userId);
      const followers_user = data.followers;
      console.log("follower", followers_user);
      const infoFollo = await Promise.all(
        followers_user.map(async (followerId) => {
          const profile = await getProfileById(followerId);
          return profile;
        })
      );

      console.log(infoFollo);
      setFollowers(infoFollo);
    }
    getFollowers();
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
        } max-w-[90vw] min-w-[300px] h-auto overflow-y-auto scrollbar `}
      >
        <h2 className="text-2xl font-koulen mb-4 text-[#ff6600]">Yolowers</h2>
        <ul className="max-h-64 overflow-y-auto">
          {followers.map((follower) => (
            <li
              key={follower.id}
              className="flex pl-2 pr-2 items-center gap-4 py-3"
            >
              <img
                src={follower.avatar}
                className={`cursor-pointer w-10 h-10 aspect-square bg-[#ff6600] rounded-xl ring-2`}
              />
              <span className="text-white font-koulen text-base">
                {follower.display_name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default FollowersModal;
