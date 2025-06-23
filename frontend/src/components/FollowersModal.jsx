import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getUserIdFromCookie } from "../services/authService";
import { getProfileByUserId, getProfileById } from "../services/profileService";
import { followProfile } from "../services/profileService";
function FollowersModal({ onClose, onFollowChange }) {
  const [followers, setFollowers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null);

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
      const following_user = data.following;
      setIsFollowing(following_user);
      const infoFollo = await Promise.all(
        followers_user.map(async (followerId) => {
          const profile = await getProfileById(followerId);
          return profile;
        })
      );

      setFollowers(infoFollo);
    }
    getFollowers();
  }, []);

  async function handleAddingFollowers(profileName, profileId) {
    const userId = await getUserIdFromCookie();

    if (isFollowing.includes(profileId)) return;

    await followProfile(userId, profileId);
    setIsFollowing((prev) => [...prev, profileId]);

    if (onFollowChange) {
      onFollowChange();
    }
  }

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
        <h2 className="text-2xl font-koulen mb-4 text-[#ff6600]">Yolowers</h2>
        <ul className="max-h-64 overflow-y-auto">
          {followers.map((follower) => (
            <li key={follower.id} className="flex items-center gap-4 p-2 m-4">
              <img
                src={follower.avatar}
                className="cursor-pointer object-cover w-10 h-10 aspect-square bg-[#ff6600] rounded-xl ring-1 ring-[#ff6600] ring-offset-1 ring-offset-transparent"
              />
              <span className="font-koulen text-base">
                {follower.display_name}
              </span>
              {!isFollowing.includes(follower._id) && (
                <svg
                  onClick={() =>
                    handleAddingFollowers(follower.profile_name, follower._id)
                  }
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <g clip-path="url(#clip0_37_96)">
                    <path
                      d="M2.1 2.75C2.1 2.02065 2.395 1.32118 2.9201 0.805456C3.4452 0.289731 4.15739 0 4.9 0C5.64261 0 6.3548 0.289731 6.8799 0.805456C7.405 1.32118 7.7 2.02065 7.7 2.75C7.7 3.47935 7.405 4.17882 6.8799 4.69454C6.3548 5.21027 5.64261 5.5 4.9 5.5C4.15739 5.5 3.4452 5.21027 2.9201 4.69454C2.395 4.17882 2.1 3.47935 2.1 2.75ZM0 10.3619C0 8.2457 1.74563 6.53125 3.90031 6.53125H5.89969C8.05437 6.53125 9.8 8.2457 9.8 10.3619C9.8 10.7143 9.50906 11 9.15031 11H0.649688C0.290938 11 0 10.7143 0 10.3619ZM11.025 6.70312V5.32812H9.625C9.33406 5.32812 9.1 5.09824 9.1 4.8125C9.1 4.52676 9.33406 4.29688 9.625 4.29688H11.025V2.92188C11.025 2.63613 11.2591 2.40625 11.55 2.40625C11.8409 2.40625 12.075 2.63613 12.075 2.92188V4.29688H13.475C13.7659 4.29688 14 4.52676 14 4.8125C14 5.09824 13.7659 5.32812 13.475 5.32812H12.075V6.70312C12.075 6.98887 11.8409 7.21875 11.55 7.21875C11.2591 7.21875 11.025 6.98887 11.025 6.70312Z"
                      fill="#FF6600"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_37_96">
                      <rect width="14" height="11" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default FollowersModal;
