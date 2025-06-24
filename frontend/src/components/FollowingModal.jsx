import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getUserIdFromCookie } from "../services/authService";
import {
  getProfileByUserId,
  getProfileById,
  unfollowProfile,
} from "../services/profileService";
import { createNotif } from "../services/notifService";
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

  async function handleRemovingFollowers(profileName, profileId) {
    const userId = await getUserIdFromCookie();
    const profile = await getProfileByUserId(userId);
    await unfollowProfile(userId, profileId);
    await createNotif({
      id_sender: profile._id,
      id_receiver: profileId,
      type_notif: "unfollow",
      created_at: new Date(),
    });
    setFollowing((prev) => prev.filter((profile) => profile._id !== profileId));
  }

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
        className={`bg-white dark:bg-[#1F1F1F] ring-2 ring-[#ff6600] p-6 rounded-xl shadow-xl transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        } max-w-[90vw] min-w-[300px] h-auto overflow-y-auto scrollbar`}
      >
        <h2 className="text-2xl font-koulen mb-4 text-[#ff6600]">Yolowing</h2>
        <ul className="max-h-64 overflow-y-auto">
          {followings.map((following) => (
            <li key={following.id} className="flex items-center gap-4 m-4 p-2">
              <img
                src={following.avatar}
                className={`cursor-pointer object-cover w-10 h-10 aspect-square bg-[#ff6600] rounded-xl ring-1 ring-[#ff6600] ring-offset-1 ring-offset-transparent`}
              />
              <span className="font-koulen text-base">
                {following.display_name}
              </span>
              <svg
                className="cursor-pointer"
                onClick={() =>
                  handleRemovingFollowers(following.profile_name, following._id)
                }
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.1 2.75C2.1 2.02065 2.395 1.32118 2.9201 0.805456C3.4452 0.289731 4.15739 0 4.9 0C5.64261 0 6.3548 0.289731 6.8799 0.805456C7.405 1.32118 7.7 2.02065 7.7 2.75C7.7 3.47935 7.405 4.17882 6.8799 4.69454C6.3548 5.21027 5.64261 5.5 4.9 5.5C4.15739 5.5 3.4452 5.21027 2.9201 4.69454C2.395 4.17882 2.1 3.47935 2.1 2.75ZM0 10.3619C0 8.2457 1.74563 6.53125 3.90031 6.53125H5.89969C8.05438 6.53125 9.8 8.2457 9.8 10.3619C9.8 10.7143 9.50906 11 9.15031 11H0.649688C0.290938 11 0 10.7143 0 10.3619ZM10.325 4.29687H13.475C13.7659 4.29687 14 4.52676 14 4.8125C14 5.09824 13.7659 5.32812 13.475 5.32812H10.325C10.0341 5.32812 9.8 5.09824 9.8 4.8125C9.8 4.52676 10.0341 4.29687 10.325 4.29687Z"
                  fill="#FF6600"
                />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default FollowingModal;
