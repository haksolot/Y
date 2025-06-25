import { useState } from "react";
import { replyToComment, getCommentById } from "../../services/postService";
import { getUserById, getUserIdFromCookie } from "../../services/authService";
import {
  getProfileByUserId,
  getProfileById,
} from "../../services/profileService";
function Comment({
  className = "",
  onClick,
  profileName,
  content,
  dateCreation,
  id_comment,
  displayName,
  initialReplies = [],
}) {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState(initialReplies);
  const [showReplies, setShowReplies] = useState(false);
  const handleReplyToggle = () => {
    setShowReply(!showReply);
  };
  const handleShowRepliesToggle = () => {
    setShowReplies(!showReplies);
  };
  const handleSubmitReply = async () => {
    try {
      const userId = await getUserIdFromCookie();
      const profile_reply = await getProfileByUserId(userId);
      const updatedComment = await replyToComment(
        profile_reply._id,
        id_comment,
        replyContent,
        new Date().toISOString()
      );

      const allReplies = updatedComment.replies;

      const lastReplyId = allReplies[allReplies.length - 1];

      const lastReply = await getCommentById(lastReplyId);

      const profile = await getProfileById(lastReply.id_profile);
      const user = await getUserById(profile.userId);
      const enrichedReply = {
        ...lastReply,
        displayName: profile.display_name,
        profileName: user.pseudo,
      };
      // console.log("enrichedReply", enrichedReply);
      setReplyContent("");
      setShowReply(false);

      setReplies((prev) => [...prev, enrichedReply]);
    } catch (err) {
      console.error("Erreur lors de la réponse :", err);
    }
  };

  return (
    <>
      <div
        id="comment-container"
        className={`h-fit w-100 relative rounded-2xl group p-4 ring-2 ring-[#ff6600] ${className}`}
      >
        <div className="-top-4 left-4 absolute flex flex-row gap-2 items-center w-fit">
          <div className="font-koulen text-lg bg-white dark:bg-[#1F1F1F] px-2">
            {displayName}
          </div>
          <div className="font-roboto text-sm bg-white dark:bg-[#1F1F1F] px-2">
            {dateCreation}
          </div>
        </div>

        <p className="relative font-roboto text-base">{content}</p>

        <div id="reply-button">
          <svg
            onClick={handleReplyToggle}
            className="w-5 h-5 absolute right-4 bottom-4 aspect-square cursor-pointer sm:transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
            viewBox="0 0 31 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4121 0.169956C13.1084 0.477309 13.5625 1.17036 13.5625 1.9297V5.78667H20.3438C26.2289 5.78667 31 10.5356 31 16.3933C31 23.2214 26.0654 26.2708 24.9332 26.8855C24.7818 26.9699 24.6123 27 24.4428 27C23.7828 27 23.25 26.4636 23.25 25.8128C23.25 25.3608 23.5104 24.945 23.8434 24.6376C24.4125 24.1073 25.1875 23.0466 25.1875 21.2206C25.1875 18.0265 22.584 15.4351 19.375 15.4351H13.5625V19.2921C13.5625 20.0514 13.1145 20.7445 12.4121 21.0518C11.7098 21.3592 10.8984 21.2326 10.3293 20.7264L0.641797 12.0482C0.236133 11.6746 0 11.1563 0 10.6079C0 10.0595 0.236133 9.54119 0.641797 9.17357L10.3293 0.495388C10.8984 -0.0168654 11.7158 -0.143422 12.4121 0.169956Z"
              fill="#FF6600"
            />
          </svg>
        </div>
      </div>

      {replies.length > 0 && (
        <button
          onClick={handleShowRepliesToggle}
          className="text-left mt-0 text-sm font-roboto text-[#ff6600] hover:underline"
        >
          {showReplies
            ? "Hide replies"
            : `Display ${replies.length} reply${replies.length > 1 ? "s" : ""}`}
        </button>
      )}

      {showReply && (
        <div
          className="flex items-center gap-5 px-4 py-0  mt-1  backdrop-blur-md rounded-2xl ring-1 ring-[#ff6600]"
          onClick={(e) => e.stopPropagation()}
        >
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="h-8 resize-none outline-none bg-transparent
                       font-roboto text-base leading-[2] flex-1"
          />
          <svg
            className={"w-5 h-5 aspect-square cursor-pointer"}
            onClick={handleSubmitReply}
            viewBox="0 0 32 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_184_4)">
              <path
                d="M31.3286 7.61682C32.2214 8.52014 32.2214 9.98713 31.3286 10.8905L13.0428 29.3905C12.15 30.2938 10.7 30.2938 9.80713 29.3905L0.664272 20.1405C-0.228585 19.2371 -0.228585 17.7701 0.664272 16.8668C1.55713 15.9635 3.00713 15.9635 3.89999 16.8668L11.4286 24.4764L28.1 7.61682C28.9928 6.7135 30.4428 6.7135 31.3357 7.61682H31.3286Z"
                fill="#FF6600"
              />
            </g>
            <defs>
              <clipPath id="clip0_184_4">
                <rect width="32" height="37" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
      {showReplies && (
        <div className="w-100 w-3/4 mb-4 px-6 max-h-[25vh] overflow-y-auto scrollbar">
          {replies
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((reply, index) => (
              <div
                key={index}
                className=" border-t w-full border-[#ff6600]/100 px-4 py-1 flex items-start gap-3"
              >
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <p className="font-koulen text-lg">
                      {reply.displayName}
                    </p>
                    <span className="text-sm">
                      {new Date(reply.created_at).toLocaleString("fr-FR")}
                    </span>
                  </div>

                  <p className="font-roboto text-base whitespace-pre-line">
                    {reply.content}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default Comment;
