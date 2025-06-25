import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getAllUsers, getUserIdFromCookie } from "../services/authService";
import { getProfileByUserId, getProfileById } from "../services/profileService";
import UserDeleteModal from "./UserDeleteModal";

function UsersModal({ onClose, onFollowChange, onDelete }) {
  const [users, setUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showUserDeleteModal, setUserDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
    async function getUsers() {
      const users = await getAllUsers();
      // console.log("users", users);
      const profile = await Promise.all(
        users.map(async (user) => {
          const profile_user = await getProfileByUserId(user._id);
          return {
            ...user,
            profileName: profile_user.display_name,
            avatar: profile_user.avatar,
          };
        })
      );
      setUsers(profile);
    }
    getUsers();
  }, []);

  const handleUserDelete = (deletedUserId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== deletedUserId)
    );
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
        <h2 className="text-2xl font-koulen mb-4 text-[#ff6600]">Yolos</h2>
        <ul className="max-h-64 overflow-y-auto">
          {users.map((user) => (
            <li key={user.id} className="flex items-center gap-4 p-2 m-4">
              <img
                src={user.avatar}
                className="cursor-pointer object-cover w-10 h-10 aspect-square bg-[#ff6600] rounded-xl ring-1 ring-[#ff6600] ring-offset-1 ring-offset-transparent"
              />
              <span className="font-koulen text-base">{user.profileName}</span>
              <div
                id="trash-button"
                onClick={() => {
                  setUserToDelete(user._id);
                  setUserDeleteModal(true);
                }}
              >
                <svg
                  className="w-3 h-3 aspect-square cursor-pointer"
                  viewBox="0 0 24 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.24286 0.967969L6.85714 1.75H1.71429C0.766071 1.75 0 2.53203 0 3.5C0 4.46797 0.766071 5.25 1.71429 5.25H22.2857C23.2339 5.25 24 4.46797 24 3.5C24 2.53203 23.2339 1.75 22.2857 1.75H17.1429L16.7571 0.967969C16.4679 0.371875 15.8732 0 15.225 0H8.775C8.12679 0 7.53214 0.371875 7.24286 0.967969ZM22.2857 7H1.71429L2.85 25.5391C2.93571 26.9227 4.06071 28 5.41607 28H18.5839C19.9393 28 21.0643 26.9227 21.15 25.5391L22.2857 7Z"
                    fill="#FF6600"
                  />
                </svg>
              </div>
            </li>
          ))}
          {showUserDeleteModal && userToDelete && (
            <UserDeleteModal
              onClose={() => {
                setUserDeleteModal(false);
                setUserToDelete(null);
              }}
              id_user={userToDelete}
              onDelete={handleUserDelete}
            />
          )}
        </ul>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}

export default UsersModal;
