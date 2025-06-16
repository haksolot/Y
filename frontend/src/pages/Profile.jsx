import { useEffect, useState } from "react";
import Post from "../components/ProfilePost.jsx";
import ProfileEditModal from "../components/ProfileEditModal.jsx";

function Profile({ onClick }) {
  const [showProfileEdit, setProfileEdit] = useState(false);

  const [displayName, setDisplayName] = useState("Haksolot");
  const [username, setUsername] = useState("@haksolot");
  const [bio, setBio] = useState(
    "Just a random dude making random stuff like brrr goofy ha stuff"
  );
  const [avatarColor, setAvatarColor] = useState("bg-red-500");
  return (
    <div className="flex flex-col h-screen">
      <div
        id="top-part"
        className="relative left-1/2 -translate-x-1/2 flex flex-col gap-4 w-9/12 sm:w-3/4 md:w-3/5 pt-20"
      >
        <div id="first" className="flex flex-row items-center gap-4">
          <div id="display-name" className="font-koulen text-4xl text-white">
            Haksolot
          </div>
          <div onClick={() => setProfileEdit(true)}>
            <svg
              class="w-6 h-6 aspect-square cursor-pointer"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2671 0.810351C22.1866 -0.270117 20.4401 -0.270117 19.3596 0.810351L17.8746 2.29044L22.7046 7.12048L24.1896 5.63545C25.2701 4.55499 25.2701 2.80848 24.1896 1.72801L23.2671 0.810351ZM8.5056 11.6644C8.20465 11.9653 7.97277 12.3353 7.83956 12.7448L6.3792 17.1259C6.23612 17.5502 6.3496 18.0189 6.66535 18.3396C6.9811 18.6603 7.4498 18.7688 7.87903 18.6257L12.2601 17.1654C12.6647 17.0322 13.0347 16.8003 13.3406 16.4993L21.5946 8.24042L16.7596 3.40545L8.5056 11.6644ZM4.7363 2.89728C2.12147 2.89728 0 5.01875 0 7.63358V20.2637C0 22.8785 2.12147 25 4.7363 25H17.3664C19.9813 25 22.1027 22.8785 22.1027 20.2637V15.5274C22.1027 14.6542 21.3972 13.9486 20.524 13.9486C19.6507 13.9486 18.9452 14.6542 18.9452 15.5274V20.2637C18.9452 21.137 18.2397 21.8425 17.3664 21.8425H4.7363C3.86304 21.8425 3.15753 21.137 3.15753 20.2637V7.63358C3.15753 6.76032 3.86304 6.05481 4.7363 6.05481H9.47259C10.3458 6.05481 11.0514 5.3493 11.0514 4.47605C11.0514 3.60279 10.3458 2.89728 9.47259 2.89728H4.7363Z"
                fill="#FF6600"
              />
            </svg>
          </div>
          {showProfileEdit && (
            <ProfileEditModal
              onClose={() => setProfileEdit(false)}
              displayName={displayName}
              username={username}
              bio={bio}
              avatarColor={avatarColor}
            />
          )}
        </div>
        <div id="second" className="flex flex-row gap-4 items-center">
          <div
            id="avatar"
            className="bg-red-500 ring-2 ring-[#ff6600] rounded-xl w-20 h-20 aspect-square"
          ></div>
          <div id="info" className="flex flex-col gap-2">
            <div
              id="username"
              className="font-roboto font-bold text-white text-sm"
            >
              @haksolot
            </div>
            <div id="bio" className="font-roboto text-white text-base">
              Just a random dude making random stuff like brrr goofy ha stuff
            </div>
          </div>
        </div>
        <div
          id="dividing-line"
          className="pt-4 border-b-2 border-[#ffffff] w-full h-1"
        ></div>
      </div>
      <div
        id="posts"
        className="w-screen flex flex-col gap-14 pt-14 items-center overflow-y-auto pb-32"
      >
        <Post className="w-3/4 sm:w-3/4 md:w-3/5" />
        <Post className="w-3/4 sm:w-3/4 md:w-3/5" />
        <Post className="w-3/4 sm:w-3/4 md:w-3/5" />
        <Post className="w-3/4 sm:w-3/4 md:w-3/5" />
        <Post className="w-3/4 sm:w-3/4 md:w-3/5" />
        <Post className="w-3/4 sm:w-3/4 md:w-3/5" />
      </div>
    </div>
  );
}

export default Profile;
