import { useEffect, useState } from "react";
import Post from "../components/ProfilePost.jsx";
import ProfileEditModal from "../components/ProfileEditModal.jsx";
import { getPostByIdProfile } from "../services/postService.js";
import { getUserIdFromCookie, getUserById } from "../services/authService.js";
import { apiAuth } from "../utils/axios.js";
import {
  getProfileByUserId,
  getProfileById,
} from "../services/profileService.js";
import FollowersModal from "../components/FollowersModal.jsx";
import FollowingModal from "../components/FollowingModal.jsx";
function Profile({ onClick }) {
  const [showProfileEdit, setProfileEdit] = useState(false);
  const [showFollowersModal, setFollowersModal] = useState(false);
  const [showFollowingModal, setFollowingModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [numberPost, setNumberPost] = useState(0);
  const [numberFollowers, setnumberFollowers] = useState(0);
  const [numberFollowing, setnumberFollowing] = useState(0);
  const [displayName, setDisplayName] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [avatar, setAvatar] = useState();

  const handleProfileUpdated = (updated) => {
    setDisplayName(updated.name);
    setBio(updated.description);
    setAvatar(updated.avatar);
  };
  const handlePostDeleted = (deletedId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedId));
  };

  useEffect(() => {
    async function getPosts() {
      const userId = await getUserIdFromCookie();
      const profile = await getProfileByUserId(userId);
      const data = await getPostByIdProfile(profile._id);
      const PostWithName = [];
      for (const post of data) {
        const profile = await getProfileById(post.id_profile);
        const user = await getUserById(profile.userId);
        PostWithName.push({
          ...post,
          profileName: user.pseudo,
        });
      }

      setPosts(PostWithName);
    }
    getPosts();
  }, []);

  useEffect(() => {
    setNumberPost(posts.length);
  }, [posts]);

  useEffect(() => {
    async function getProfile() {
      const userId = await getUserIdFromCookie();
      const user = await getUserById(userId);
      const data = await getProfileByUserId(userId);
      const numberFollowers = data.followers;
      const numberFollowing = data.following;
      setnumberFollowers(numberFollowers.length);
      setnumberFollowing(numberFollowing.length);
      setDisplayName(data.display_name);
      setUsername(user.pseudo);
      setBio(data.bio);
      setAvatar(data.avatar);
    }
    getProfile();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div
        id="top-part"
        className="relative left-1/2 -translate-x-1/2 flex flex-col gap-4 w-9/12 sm:w-3/4 md:w-3/5 pt-20"
      >
        <div id="first" className="flex flex-row items-center gap-4">
          <div id="display-name" className="font-koulen text-4xl text-white">
            {displayName}
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
              onProfileUpdated={handleProfileUpdated}
              displayName={displayName}
              username={username}
              bio={bio}
              avatar={avatar}
            />
          )}
        </div>
        <div id="second" className="flex flex-row gap-4 items-center">
          <div
            id="avatar"
            className="bg-red-500 ring-2 ring-[#ff6600] rounded-xl w-20 h-20 aspect-square overflow-hidden"
          >
            <img src={avatar} className={`w-full h-full object-cover`} />
          </div>
          <div id="info" className="flex flex-col gap-2">
            <div
              id="username"
              className="font-roboto font-bold text-white text-sm"
            >
              @{username}
            </div>
            <div id="bio" className="font-roboto text-white text-base">
              {bio}
            </div>
          </div>
        </div>
        <div
          id="dividing-line"
          className="pt-4 border-b-2 border-[#ffffff] w-full h-1"
        ></div>

        <div class="flex items-center justify-around">
          <div class="flex flex-col items-center">
            <svg
              className="cursor-pointer"
              onClick={() => setFollowersModal(true)}
              width="40"
              height="40"
              viewBox="0 0 48 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.25 10.625C1.45742 10.625 0 12.0824 0 13.875C0 15.6676 1.45742 17.125 3.25 17.125H3.30078C3.48867 21.6395 7.21094 25.25 11.7812 25.25H14.625V15.5H13.4062H4.50938H3.25C2.35117 15.5 1.625 14.7738 1.625 13.875C1.625 12.9762 2.35117 12.25 3.25 12.25H23.5625C24.0094 12.25 24.375 11.8844 24.375 11.4375C24.375 10.9906 24.0094 10.625 23.5625 10.625H3.25ZM11.375 32.1562C11.375 32.8316 11.9184 33.375 12.5938 33.375H16.25V29.7086L12.9949 28.5711C12.3602 28.3477 11.6645 28.6828 11.441 29.3176C11.2176 29.9523 11.5527 30.648 12.1875 30.8715L12.416 30.9527C11.832 31.034 11.375 31.5418 11.375 32.1562ZM17.875 33.3395C19.7234 33.1719 21.4043 32.4457 22.7551 31.3285L18.3625 29.5715C18.2102 29.6629 18.0477 29.734 17.875 29.7898V33.3395ZM23.9992 30.0742C25.2484 28.5355 26 26.5754 26 24.4375C26 23.8129 25.934 23.2035 25.8121 22.6145L19.4391 27.0324C19.4797 27.2051 19.5 27.3879 19.5 27.5707C19.5 27.8043 19.4645 28.0277 19.4035 28.2359L23.9992 30.0742ZM17.0625 15.5H16.25V25.25H17.1793C17.682 25.25 18.1492 25.4125 18.5301 25.6816L25.3094 20.9895C23.9586 17.7648 20.7746 15.5 17.0625 15.5ZM8.53125 18.75C8.53125 18.4268 8.65965 18.1168 8.88821 17.8882C9.11677 17.6597 9.42677 17.5312 9.75 17.5312C10.0732 17.5312 10.3832 17.6597 10.6118 17.8882C10.8403 18.1168 10.9688 18.4268 10.9688 18.75C10.9687 19.0732 10.8403 19.3832 10.6118 19.6118C10.3832 19.8403 10.0732 19.9688 9.75 19.9688C9.42677 19.9688 9.11677 19.8403 8.88821 19.6118C8.65965 19.3832 8.53125 19.0732 8.53125 18.75Z"
                fill="#FF6600"
              />
              <path
                d="M13.25 1.625C11.4574 1.625 10 3.08242 10 4.875C10 6.66758 11.4574 8.125 13.25 8.125H13.3008C13.4887 12.6395 17.2109 16.25 21.7812 16.25H24.625V6.5H23.4062H14.5094H13.25C12.3512 6.5 11.625 5.77383 11.625 4.875C11.625 3.97617 12.3512 3.25 13.25 3.25H33.5625C34.0094 3.25 34.375 2.88438 34.375 2.4375C34.375 1.99062 34.0094 1.625 33.5625 1.625H13.25ZM21.375 23.1562C21.375 23.8316 21.9184 24.375 22.5938 24.375H26.25V20.7086L22.9949 19.5711C22.3602 19.3477 21.6645 19.6828 21.441 20.3176C21.2176 20.9523 21.5527 21.648 22.1875 21.8715L22.416 21.9527C21.832 22.034 21.375 22.5418 21.375 23.1562ZM27.875 24.3395C29.7234 24.1719 31.4043 23.4457 32.7551 22.3285L28.3625 20.5715C28.2102 20.6629 28.0477 20.734 27.875 20.7898V24.3395ZM33.9992 21.0742C35.2484 19.5355 36 17.5754 36 15.4375C36 14.8129 35.934 14.2035 35.8121 13.6145L29.4391 18.0324C29.4797 18.2051 29.5 18.3879 29.5 18.5707C29.5 18.8043 29.4645 19.0277 29.4035 19.2359L33.9992 21.0742ZM27.0625 6.5H26.25V16.25H27.1793C27.682 16.25 28.1492 16.4125 28.5301 16.6816L35.3094 11.9895C33.9586 8.76484 30.7746 6.5 27.0625 6.5ZM18.5312 9.75C18.5312 9.42677 18.6597 9.11677 18.8882 8.88821C19.1168 8.65965 19.4268 8.53125 19.75 8.53125C20.0732 8.53125 20.3832 8.65965 20.6118 8.88821C20.8403 9.11677 20.9688 9.42677 20.9688 9.75C20.9688 10.0732 20.8403 10.3832 20.6118 10.6118C20.3832 10.8403 20.0732 10.9687 19.75 10.9688C19.4268 10.9687 19.1168 10.8403 18.8882 10.6118C18.6597 10.3832 18.5312 10.0732 18.5312 9.75Z"
                fill="#FF6600"
              />
            </svg>
            <p className="select-none mt-2 font-roboto text-sm text-white">Yolowers</p>
            <p className="mt-4 font-koulen text-sm text-[#ff6600]">
              {numberFollowers}
            </p>
          </div>
          {showFollowersModal && (
            <FollowersModal
              onClose={() => setFollowersModal(false)}
              username={username}
            />
          )}
          <div class="flex flex-col items-center">
            <svg
              className="cursor-pointer"
              onClick={() => setFollowingModal(true)}
              width="40"
              height="40"
              viewBox="0 0 48 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.25 13.625C1.45742 13.625 0 15.0824 0 16.875C0 18.6676 1.45742 20.125 3.25 20.125H3.30078C3.48867 24.6395 7.21094 28.25 11.7812 28.25H14.625V18.5H13.4062H4.50938H3.25C2.35117 18.5 1.625 17.7738 1.625 16.875C1.625 15.9762 2.35117 15.25 3.25 15.25H23.5625C24.0094 15.25 24.375 14.8844 24.375 14.4375C24.375 13.9906 24.0094 13.625 23.5625 13.625H3.25ZM11.375 35.1562C11.375 35.8316 11.9184 36.375 12.5938 36.375H16.25V32.7086L12.9949 31.5711C12.3602 31.3477 11.6645 31.6828 11.441 32.3176C11.2176 32.9523 11.5527 33.648 12.1875 33.8715L12.416 33.9527C11.832 34.034 11.375 34.5418 11.375 35.1562ZM17.875 36.3395C19.7234 36.1719 21.4043 35.4457 22.7551 34.3285L18.3625 32.5715C18.2102 32.6629 18.0477 32.734 17.875 32.7898V36.3395ZM23.9992 33.0742C25.2484 31.5355 26 29.5754 26 27.4375C26 26.8129 25.934 26.2035 25.8121 25.6145L19.4391 30.0324C19.4797 30.2051 19.5 30.3879 19.5 30.5707C19.5 30.8043 19.4645 31.0277 19.4035 31.2359L23.9992 33.0742ZM17.0625 18.5H16.25V28.25H17.1793C17.682 28.25 18.1492 28.4125 18.5301 28.6816L25.3094 23.9895C23.9586 20.7648 20.7746 18.5 17.0625 18.5ZM8.53125 21.75C8.53125 21.4268 8.65965 21.1168 8.88821 20.8882C9.11677 20.6597 9.42677 20.5312 9.75 20.5312C10.0732 20.5312 10.3832 20.6597 10.6118 20.8882C10.8403 21.1168 10.9688 21.4268 10.9688 21.75C10.9687 22.0732 10.8403 22.3832 10.6118 22.6118C10.3832 22.8403 10.0732 22.9688 9.75 22.9688C9.42677 22.9688 9.11677 22.8403 8.88821 22.6118C8.65965 22.3832 8.53125 22.0732 8.53125 21.75Z"
                fill="#FF6600"
              />
              <path
                d="M13.25 4.625C11.4574 4.625 10 6.08242 10 7.875C10 9.66758 11.4574 11.125 13.25 11.125H13.3008C13.4887 15.6395 17.2109 19.25 21.7812 19.25H24.625V9.5H23.4062H14.5094H13.25C12.3512 9.5 11.625 8.77383 11.625 7.875C11.625 6.97617 12.3512 6.25 13.25 6.25H33.5625C34.0094 6.25 34.375 5.88438 34.375 5.4375C34.375 4.99062 34.0094 4.625 33.5625 4.625H13.25ZM21.375 26.1562C21.375 26.8316 21.9184 27.375 22.5938 27.375H26.25V23.7086L22.9949 22.5711C22.3602 22.3477 21.6645 22.6828 21.441 23.3176C21.2176 23.9523 21.5527 24.648 22.1875 24.8715L22.416 24.9527C21.832 25.034 21.375 25.5418 21.375 26.1562ZM27.875 27.3395C29.7234 27.1719 31.4043 26.4457 32.7551 25.3285L28.3625 23.5715C28.2102 23.6629 28.0477 23.734 27.875 23.7898V27.3395ZM33.9992 24.0742C35.2484 22.5355 36 20.5754 36 18.4375C36 17.8129 35.934 17.2035 35.8121 16.6145L29.4391 21.0324C29.4797 21.2051 29.5 21.3879 29.5 21.5707C29.5 21.8043 29.4645 22.0277 29.4035 22.2359L33.9992 24.0742ZM27.0625 9.5H26.25V19.25H27.1793C27.682 19.25 28.1492 19.4125 28.5301 19.6816L35.3094 14.9895C33.9586 11.7648 30.7746 9.5 27.0625 9.5ZM18.5312 12.75C18.5312 12.4268 18.6597 12.1168 18.8882 11.8882C19.1168 11.6597 19.4268 11.5313 19.75 11.5312C20.0732 11.5313 20.3832 11.6597 20.6118 11.8882C20.8403 12.1168 20.9688 12.4268 20.9688 12.75C20.9688 13.0732 20.8403 13.3832 20.6118 13.6118C20.3832 13.8403 20.0732 13.9687 19.75 13.9688C19.4268 13.9687 19.1168 13.8403 18.8882 13.6118C18.6597 13.3832 18.5312 13.0732 18.5312 12.75Z"
                fill="#FF6600"
              />
              <path
                d="M44.1428 1.71875C44.1428 1.33848 43.8556 1.03125 43.5 1.03125C43.1444 1.03125 42.8571 1.33848 42.8571 1.71875V4.8125H39.9643C39.6087 4.8125 39.3214 5.11973 39.3214 5.5C39.3214 5.88027 39.6087 6.1875 39.9643 6.1875H42.8571V9.28125C42.8571 9.66152 43.1444 9.96875 43.5 9.96875C43.8556 9.96875 44.1428 9.66152 44.1428 9.28125V6.1875H47.0357C47.3913 6.1875 47.6786 5.88027 47.6786 5.5C47.6786 5.11973 47.3913 4.8125 47.0357 4.8125H44.1428V1.71875Z"
                fill="#FF6600"
              />
            </svg>

            <p className="select-none mt-2 font-roboto text-sm text-white">Yolowing</p>
            <p className="mt-4 font-koulen text-sm text-[#ff6600]">
              {numberFollowing}
            </p>
          </div>
          {showFollowingModal && (
            <FollowingModal
              onClose={() => setFollowingModal(false)}
              username={username}
            />
          )}
          <div class="flex flex-col items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5903 0.181614C18.9673 0.408476 19.1651 0.800623 19.0942 1.19277L16.7056 14.6749C16.6496 14.9892 16.4294 15.2647 16.1084 15.4203C15.7875 15.5758 15.403 15.5953 15.0634 15.4721L10.5997 13.8614L8.04321 16.2629C7.71105 16.5773 7.18854 16.681 6.72949 16.5254C6.27043 16.3698 5.97186 15.9842 5.97186 15.5564V12.847C5.97186 12.7174 6.02784 12.5942 6.12861 12.497L12.3837 6.57264C12.6002 6.36847 12.5927 6.0541 12.3688 5.85965C12.1449 5.66519 11.7828 5.65223 11.5477 5.83696L3.95649 11.6932L0.660982 10.2608C0.265373 10.089 0.0115852 9.74547 0.000388726 9.36304C-0.0108078 8.98062 0.220587 8.62412 0.601268 8.43291L17.3214 0.136241C17.7207 -0.0614529 18.2134 -0.0420076 18.5903 0.181614Z"
                fill="#FF6600"
              />
            </svg>
            <p className="select-none mt-4 font-roboto text-sm text-white">Yeets</p>
            <p className="mt-4 font-koulen text-sm text-[#ff6600]">
              {numberPost}
            </p>
          </div>
        </div>
      </div>
      <div
        id="posts"
        className="w-screen flex flex-col gap-14 pt-1 mt-8 items-center overflow-y-auto scrollbar pb-32"
      >
        {posts
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((post) => (
            <Post
              onDelete={handlePostDeleted}
              key={post._id}
              className="w-3/4 sm:w-3/4 md:w-3/5"
              profileName={post.profileName}
              content={post.content}
              dateCreation={new Date(post.created_at).toLocaleString("fr-FR")}
              id_post={post._id}
            />
          ))}
      </div>
    </div>
  );
}

export default Profile;
