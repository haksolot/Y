function Comment({ className = "", onClick }) {
  return (
    <>
      <div
        id="comment-container"
        className={`h-fit w-100 relative rounded-2xl bg-[#1F1F1F] p-4 ring-2 ring-[#ff6600] ${className}`}
      >
        <div
          id="profile-name"
          className="text-white font-koulen text-lg bg-[#1F1F1F] px-2 -top-4 left-3 absolute flex flex-row gap-2 items-center w-fit"
        >
          Haksolot
        </div>
        <p id="message" className="relative text-white font-roboto text-base">
          This is just a basic message to check out if the post fonction is
          working right ?
        </p>
      </div>
    </>
  );
}

export default Comment;
