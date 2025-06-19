import { useState } from "react";
import PostEdit from "./ProfilePostEditModal";

function ProfilePost({ className = "", content, date_creation }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div
        id="post-container"
        className={`h-fit w-100 relative rounded-2xl bg-[#1F1F1F] p-4 ring-2 ring-[#ff6600] ${className}`}
      >
        <div
          id="post-timestamp"
          className="italic text-nowrap -top-3 left-1/2 -translate-x-1/2 absolute text-white font-roboto text-sm bg-[#1F1F1F] pl-2 pr-2"
        >
          {date_creation}
        </div>
        <p id="message" className="relative text-white font-roboto text-base">
          {content}
        </p>
        <div
          id="buttons-container"
          className="mt-2 left-1/2 -translate-x-1/2 pl-4 pr-4 absolute align-middle items-center flex flex-row gap-4 bg-[#1F1F1F]"
        >
          <div id="trash-button">
            <svg
              class="w-5 h-5 aspect-square cursor-pointer"
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
          <div id="edit-post-button" onClick={() => setIsEditing(true)}>
            <svg
              class="w-5 h-5 aspect-square cursor-pointer"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.0591 0.907593C24.849 -0.302531 22.8929 -0.302531 21.6828 0.907593L20.0195 2.5653L25.4292 7.97494L27.0924 6.31171C28.3025 5.10158 28.3025 3.14549 27.0924 1.93537L26.0591 0.907593ZM9.52627 13.0641C9.18921 13.4012 8.9295 13.8156 8.7803 14.2742L7.1447 19.181C6.98446 19.6562 7.11155 20.1812 7.46519 20.5403C7.81884 20.8995 8.34378 21.0211 8.82451 20.8608L13.7313 19.2252C14.1844 19.076 14.5988 18.8163 14.9414 18.4793L24.1859 9.22927L18.7707 3.8141L9.52627 13.0641ZM5.30465 3.24496C2.37604 3.24496 0 5.621 0 8.54961V22.6953C0 25.624 2.37604 28 5.30465 28H19.4504C22.379 28 24.755 25.624 24.755 22.6953V17.3907C24.755 16.4126 23.9649 15.6225 22.9868 15.6225C22.0088 15.6225 21.2186 16.4126 21.2186 17.3907V22.6953C21.2186 23.6734 20.4284 24.4636 19.4504 24.4636H5.30465C4.32661 24.4636 3.53644 23.6734 3.53644 22.6953V8.54961C3.53644 7.57156 4.32661 6.78139 5.30465 6.78139H10.6093C11.5874 6.78139 12.3775 5.99122 12.3775 5.01317C12.3775 4.03513 11.5874 3.24496 10.6093 3.24496H5.30465Z"
                fill="#FF6600"
              />
            </svg>
          </div>
          {isEditing && <PostEdit onClose={() => setIsEditing(false)} setIsEditing={setIsEditing} />}
        </div>
      </div>
    </>
  );
}

export default ProfilePost;
