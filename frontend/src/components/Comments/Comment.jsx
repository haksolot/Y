function Comment({
  className = "",
  onClick,
  profileName,
  content,
  dateCreation,
}) {
  return (
    <>
      <div
        id="comment-container"
        className={`h-fit w-100 relative rounded-2xl bg-[#1F1F1F] p-4 ring-2 ring-[#ff6600] ${className}`}
      >
        <div className="-top-4 left-4 absolute flex flex-row gap-2 items-center w-fit">
          <div
            id="profile-name"
            className="text-white font-koulen text-lg bg-[#1F1F1F] px-2 -top-4 left-3  flex flex-row gap-2 items-center w-fit"
          >
            {profileName}
          </div>
          <div
            id="date-creation"
            className="text-nowrap text-white font-roboto text-sm bg-[#1F1F1F] px-2 -top-4 left-3  flex flex-row gap-2 items-center w-fit"
          >
            {dateCreation}
          </div>
        </div>
        <p id="message" className="relative text-white font-roboto text-base">
          {content}
        </p>
      </div>
    </>
  );
}

export default Comment;
