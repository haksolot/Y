import { useState, useEffect } from "react";
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

function Follow({
  className = "",
  onClick,
  displayName,
  username,
  avatarColor,
  id_profile,
}) {
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
            className={"cursor-pointer w-10 h-10 aspect-square bg-red-500 rounded-xl ring-2"}
          ></div>

          <div
            id="profile-name"
            className="text-white font-koulen text-lg bg-[#1F1F1F] pl-2 pr-2"
          >
            {displayName}
          </div>
          <div
            id="avatar-color"
            className="text-white font-roboto text-sm bg-[#1F1F1F] pl-2 pr-2"
          >
            {avatarColor}
          </div>
        </div>
      </div>
    </>
  );
}

export default Follow;
