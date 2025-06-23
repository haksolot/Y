import { useState } from "react";
import ProfilePostDeleteModal from "./ProfilePostDeleteModal";
import PostEdit from "./ProfilePostEditModal";

function ProfilePost({
  className = "",
  content,
  date_creation,
  id_post,
  onDelete,
  isRepost,
  likes,
  commentaries,
}) {
  const [showProfilePostDeleteModal, setProfilePostDeleteModal] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialText, setInitialText] = useState(content);
  const handleEditedPost = (updated) => {
    // setIsEditing(true);
    setInitialText(updated.text);
  };

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
        <div className="flex flex-row justify-between items-center gap-10">
          <p id="message" className="relative text-white font-roboto text-base">
            {initialText}
          </p>
          <div className="flex flex-col">
            {isRepost && (
              <div className="flex items-center gap-1 text-xs font-koulen text-[#ff6600] px-2 py-1 select-none whitespace-nowrap">
                <svg
                  viewBox="0 0 38 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 aspect-square"
                >
                  <path
                    d="M18.2962 23.0435C19.4435 23.0435 20.3704 22.1076 20.3704 20.9491C20.3704 19.7906 19.4435 18.8547 18.2962 18.8547H11.0364C9.88905 18.8547 8.96212 17.9187 8.96212 16.7603V8.38259H11.0364C11.8725 8.38259 12.6309 7.87207 12.955 7.08667C13.2791 6.30126 13.0976 5.40458 12.5078 4.80244L8.3593 0.6136C7.54905 -0.204533 6.23321 -0.204533 5.42296 0.6136L1.27449 4.80244C0.678149 5.40458 0.503136 6.30126 0.827235 7.08667C1.15133 7.87207 1.90324 8.38259 2.7459 8.38259H4.82014V16.7603C4.82014 20.2291 7.60739 23.0435 11.0428 23.0435H18.3027H18.2962ZM20.3704 2.09933C19.2231 2.09933 18.2962 3.03527 18.2962 4.19375C18.2962 5.35222 19.2231 6.28817 20.3704 6.28817H27.6302C28.7775 6.28817 29.7045 7.22411 29.7045 8.38259V16.7603H27.6302C26.7941 16.7603 26.0357 17.2708 25.7116 18.0562C25.3875 18.8416 25.569 19.7383 26.1588 20.3404L30.3073 24.5293C31.1175 25.3474 32.4334 25.3474 33.2436 24.5293L37.3921 20.3404C37.9884 19.7383 38.1634 18.8416 37.8393 18.0562C37.5152 17.2708 36.7633 16.7603 35.9207 16.7603H33.8464V8.38259C33.8464 4.9137 31.0592 2.09933 27.6237 2.09933H20.3704Z"
                    fill="#ff6600"
                  />
                </svg>
                Reyeet
              </div>
            )}
            <div className="flex items-center gap-1 text-xs font-koulen text-[#ff6600] px-2 py-1 select-none whitespace-nowrap">
              <svg
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 aspect-square "
              >
                <path
                  d="M2.60125 14.6705L12.4762 24.254C12.886 24.6516 13.4271 24.8732 13.9899 24.8732C14.5528 24.8732 15.0938 24.6516 15.5037 24.254L25.3786 14.6705C27.0399 13.0629 27.9799 10.8076 27.9799 8.45008V8.1206C27.9799 4.14975 25.2201 0.764012 21.4549 0.110724C18.9629 -0.321014 16.4272 0.52542 14.6457 2.37735L13.9899 3.05904L13.3342 2.37735C11.5526 0.52542 9.01695 -0.321014 6.52499 0.110724C2.75973 0.764012 0 4.14975 0 8.1206V8.45008C0 10.8076 0.939949 13.0629 2.60125 14.6705Z"
                  fill="#FF6600"
                />
              </svg>
              {likes.length}
            </div>
            <div className="flex items-center gap-1 text-xs font-koulen text-[#ff6600] px-2 py-1 select-none whitespace-nowrap">
              <svg
                viewBox="0 0 29 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 aspect-square "
              >
                <path
                  d="M28.3265 11.5483C28.3265 17.9276 22.0642 23.0965 14.3374 23.0965C12.3101 23.0965 10.3866 22.7412 8.64888 22.1027C7.9986 22.5857 6.93849 23.2464 5.68165 23.8016C4.37017 24.379 2.79093 24.8732 1.22262 24.8732C0.867428 24.8732 0.550487 24.6566 0.413874 24.3235C0.277262 23.9904 0.353765 23.6129 0.599667 23.3575L0.616061 23.3408C0.632454 23.3242 0.654312 23.3019 0.687099 23.2631C0.747209 23.1965 0.840105 23.091 0.95486 22.9466C1.1789 22.669 1.47945 22.2582 1.78546 21.7474C2.33191 20.8257 2.85104 19.6154 2.95487 18.2551C1.31552 16.3674 0.3483 14.0522 0.3483 11.5483C0.3483 5.16896 6.61062 0 14.3374 0C22.0642 0 28.3265 5.16896 28.3265 11.5483Z"
                  fill="#FF6600"
                />
              </svg>
              {commentaries.length}
            </div>
          </div>
        </div>
        <div
          id="buttons-container"
          className="mt-2 left-1/2 -translate-x-1/2 pl-4 pr-4 absolute align-middle items-center flex flex-row gap-4 bg-[#1F1F1F]"
        >
          <div
            id="trash-button"
            onClick={() => setProfilePostDeleteModal(true)}
          >
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
          {showProfilePostDeleteModal && (
            <ProfilePostDeleteModal
              onClose={() => setProfilePostDeleteModal(false)}
              id_post={id_post}
              onDelete={onDelete}
            />
          )}
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
          {isEditing && (
            <PostEdit
              id_post={id_post}
              initialText={content}
              onClose={() => setIsEditing(false)}
              onPostEdited={handleEditedPost}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePost;
