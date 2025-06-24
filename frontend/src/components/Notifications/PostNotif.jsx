import { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import Comments from "./Comments/Comments";
import {
  getUserById,
  getUserIdFromCookie,
  getUserByProfileName,
} from "../services/authService";
import {
  addLikeOnPost,
  deleteLikeOnPost,
  getAllPosts,
  getPostById,
} from "../services/postService";
import {
  followProfile,
  getProfileByUserId,
  unfollowProfile,
} from "../services/profileService";
import { createNotif } from "../services/notifService";
function PostNotif({
  className = "",
  onClick,
  profileName,
  content,
  dateCreation,
  id_post,
  display_name,
  avatar,
}) {
  const [showProfileModal, setProfileModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null); // null = pas encore chargé
  useEffect(() => {
    async function LikedStatus() {
      const infoPost = await getPostById(id_post);
      const likers = infoPost.likes;
      const userId = await getUserIdFromCookie();
      const hasAlreadyLiked = likers.includes(userId);
      setLiked(hasAlreadyLiked);
    }

    LikedStatus();
  }, [id_post]);

  useEffect(() => {
    async function checkIfFollowing() {
      if (!profileName) return;

      const userIdByCookie = await getUserIdFromCookie();
      const profile = await getProfileByUserId(userIdByCookie);
      const following = profile.following || [];

      const userTargeted = await getUserByProfileName(profileName);
      if (!userTargeted) {
        setIsFollowing(false);
        return;
      }
      const targetedUserId = String(userTargeted._id);

      const followingStatus = following.some(
        (followedId) => String(followedId) === targetedUserId
      );

      setIsFollowing(followingStatus);
    }

    checkIfFollowing();
  }, [profileName]);

  async function handleAddingFollowers(profileName) {
    const userId = await getUserIdFromCookie();
    const profile = await getProfileByUserId(userId);
    const userTargeted = await getUserByProfileName(profileName);
    const profileTargeted = await getProfileByUserId(userTargeted._id);

    const currentUserProfile = await getProfileByUserId(userId);
    const following = currentUserProfile.following || [];

    const currentlyFollowing = following.some(
      (followedId) => String(followedId) === String(profileTargeted._id)
    );

    if (currentlyFollowing) {
      await unfollowProfile(userId, profileTargeted._id);
      await createNotif({
        id_sender: profile._id,
        id_receiver: profileTargeted._id,
        type_notif: "unfollow",
        created_at: new Date(),
      });
    } else {
      await followProfile(userId, profileTargeted._id);
      await createNotif({
        id_sender: profile._id,
        id_receiver: profileTargeted._id,
        type_notif: "follow",
        created_at: new Date(),
      });
    }

    const updatedUserProfile = await getProfileByUserId(userId);
    const updatedFollowing = updatedUserProfile.following || [];

    const updatedFollowingStatus = updatedFollowing.some(
      (followedId) => String(followedId) === String(profileTargeted._id)
    );

    setIsFollowing(updatedFollowingStatus);
  }

  async function handleLike() {
    const infoPost = await getPostById(id_post);
    const likers = infoPost.likes;
    const userId = await getUserIdFromCookie();
    const hasAlreadyLiked = likers.some((id) => id === userId);

    if (hasAlreadyLiked) {
      await deleteLikeOnPost(id_post, userId);
      setLiked(false);
    } else {
      await addLikeOnPost(id_post, userId);
      setLiked(true);
    }
  }

  async function handlePostCreated(newComment) {
    try {
      const user = await getUserById(newComment.id_profile);
      const enrichedComment = {
        ...newComment,
        profileName: user.pseudo,
      };

      setComments((prevComments) => [enrichedComment, ...prevComments]);
    } catch (error) {
      console.error("Erreur lors de l'enrichissement du commentaire :", error);
    }
  }
  return (
    <>
      <div
        id="post-container"
        className={`h-fit w-100 relative rounded-2xl bg-[#1F1F1F] p-4 ring-2 ring-[#ff6600] ${className}`}
      >
        <div
          id="profile-info"
          className="-top-6 -left-6 absolute flex flex-row gap-2 items-center w-fit"
        >
          <div
            id="profile-image"
            onClick={() => handleAddingFollowers(profileName)}
          >
            {" "}
            <img
              src={avatar}
              className={`cursor-pointer object-cover w-10 h-10 aspect-square bg-[#ff6600] rounded-xl ring-2 ${
                isFollowing ? "ring-white" : "ring-[#ff6600]"
              }`}
            />
          </div>

          <div
            id="profile-name"
            className="cursor-pointer text-white font-koulen text-lg bg-[#1F1F1F] pl-2 pr-2"
            onClick={() => setProfileModal(true)}
          >
            {display_name}
          </div>
          {showProfileModal && (
            <ProfileModal
              onClose={() => setProfileModal(false)}
              displayName={display_name}
              profileName={profileName}
              avatar={avatar}
            />
          )}
          <div
            id="date-creation"
            className="text-white font-roboto text-sm bg-[#1F1F1F] pl-2 pr-2"
          >
            {dateCreation}
          </div>
        </div>
        <p id="message" className="relative text-white font-roboto text-base ">
          {content}
        </p>
        <div
          id="buttons-container"
          className="mt-2 left-1/2 -translate-x-1/2 pl-4 pr-4 absolute align-middle items-center flex flex-row gap-4 bg-[#1F1F1F]"
        >
          <div id="like-button">
            <svg
              viewBox="0 0 28 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 aspect-square cursor-pointer"
              onClick={handleLike}
            >
              <path
                className={liked ? "fill-white" : "fill-[#FF6600]"}
                d="M2.60125 14.6705L12.4762 24.254C12.886 24.6516 13.4271 24.8732 13.9899 24.8732C14.5528 24.8732 15.0938 24.6516 15.5037 24.254L25.3786 14.6705C27.0399 13.0629 27.9799 10.8076 27.9799 8.45008V8.1206C27.9799 4.14975 25.2201 0.764012 21.4549 0.110724C18.9629 -0.321014 16.4272 0.52542 14.6457 2.37735L13.9899 3.05904L13.3342 2.37735C11.5526 0.52542 9.01695 -0.321014 6.52499 0.110724C2.75973 0.764012 0 4.14975 0 8.1206V8.45008C0 10.8076 0.939949 13.0629 2.60125 14.6705Z"
                // fill="#FF6600"
              />
            </svg>
          </div>
          <div id="comment-button" onClick={onClick}>
            <svg
              onClick={() => setShowComments(true)}
              viewBox="0 0 29 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 aspect-square cursor-pointer"
            >
              <path
                d="M28.3265 11.5483C28.3265 17.9276 22.0642 23.0965 14.3374 23.0965C12.3101 23.0965 10.3866 22.7412 8.64888 22.1027C7.9986 22.5857 6.93849 23.2464 5.68165 23.8016C4.37017 24.379 2.79093 24.8732 1.22262 24.8732C0.867428 24.8732 0.550487 24.6566 0.413874 24.3235C0.277262 23.9904 0.353765 23.6129 0.599667 23.3575L0.616061 23.3408C0.632454 23.3242 0.654312 23.3019 0.687099 23.2631C0.747209 23.1965 0.840105 23.091 0.95486 22.9466C1.1789 22.669 1.47945 22.2582 1.78546 21.7474C2.33191 20.8257 2.85104 19.6154 2.95487 18.2551C1.31552 16.3674 0.3483 14.0522 0.3483 11.5483C0.3483 5.16896 6.61062 0 14.3374 0C22.0642 0 28.3265 5.16896 28.3265 11.5483Z"
                fill="#FF6600"
              />
            </svg>
          </div>
          {showComments && (
            <Comments
              onClose={() => setShowComments(false)}
              id_post={id_post}
              onPostCreated={handlePostCreated}
            />
          )}

          <div id="repost-button">
            <svg
              viewBox="0 0 38 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 aspect-square cursor-pointer"
            >
              <path
                d="M18.2962 23.0435C19.4435 23.0435 20.3704 22.1076 20.3704 20.9491C20.3704 19.7906 19.4435 18.8547 18.2962 18.8547H11.0364C9.88905 18.8547 8.96212 17.9187 8.96212 16.7603V8.38259H11.0364C11.8725 8.38259 12.6309 7.87207 12.955 7.08667C13.2791 6.30126 13.0976 5.40458 12.5078 4.80244L8.3593 0.6136C7.54905 -0.204533 6.23321 -0.204533 5.42296 0.6136L1.27449 4.80244C0.678149 5.40458 0.503136 6.30126 0.827235 7.08667C1.15133 7.87207 1.90324 8.38259 2.7459 8.38259H4.82014V16.7603C4.82014 20.2291 7.60739 23.0435 11.0428 23.0435H18.3027H18.2962ZM20.3704 2.09933C19.2231 2.09933 18.2962 3.03527 18.2962 4.19375C18.2962 5.35222 19.2231 6.28817 20.3704 6.28817H27.6302C28.7775 6.28817 29.7045 7.22411 29.7045 8.38259V16.7603H27.6302C26.7941 16.7603 26.0357 17.2708 25.7116 18.0562C25.3875 18.8416 25.569 19.7383 26.1588 20.3404L30.3073 24.5293C31.1175 25.3474 32.4334 25.3474 33.2436 24.5293L37.3921 20.3404C37.9884 19.7383 38.1634 18.8416 37.8393 18.0562C37.5152 17.2708 36.7633 16.7603 35.9207 16.7603H33.8464V8.38259C33.8464 4.9137 31.0592 2.09933 27.6237 2.09933H20.3704Z"
                fill="#FF6600"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostNotif;
