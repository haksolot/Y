import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Comment from "./Comment";
import {
  addCommentOnPost,
  createComment,
  getPostById,
} from "../../services/postService";
import { getCommentById } from "../../services/postService";
import { getUserIdFromCookie, getUserById } from "../../services/authService";
import {
  getProfileByUserId,
  getProfileById,
} from "../../services/profileService";
import { createNotif } from "../../services/notifService";

function Comments({ onClose, id_post, onPostCreated }) {
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function getCommentsFromPost() {
      try {
        const data = await getPostById(id_post);
        console.log("data", data);
        const comments = data.commentaries;
        const commentsData = await Promise.all(
          comments.map((id) => getCommentById(id))
        );
        const enrichedComments = await Promise.all(
          commentsData.map(async (comment) => {
            console.log("comment", comment);
            const profile = await getProfileById(comment.id_profile);
            console.log("Profil récupéré:", profile);
            const user = await getUserById(profile.userId);
            console.log("user", user);
            const enrichedReplies = await Promise.all(
              (comment.replies || []).map(async (replyId) => {
                const replyData = await getCommentById(replyId);
                const profile = await getProfileById(replyData.id_profile);
                const replyUser = await getUserById(profile.userId);
                console.log("replyUser", replyUser);
                const replyProfile = await getProfileByUserId(replyUser._id);
                return {
                  ...replyData,
                  displayName: replyProfile.display_name,
                  profileName: replyUser.pseudo,
                };
              })
            );

            return {
              ...comment,
              displayName: profile.display_name,
              profileName: user.pseudo,
              replies: enrichedReplies,
            };
          })
        );
        setComments(enrichedComments);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires :", error);
      }
    }

    getCommentsFromPost();
  }, [id_post]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  async function handleSubmit() {
    const userId = await getUserIdFromCookie();
    const profile = await getProfileByUserId(userId);
    const newComment = {
      content,
      created_at: new Date().toISOString(),
      id_profile: profile._id || "Unknown",
    };
    const post = await getPostById(id_post);
    const createdComment = await createComment(newComment);
    await addCommentOnPost(id_post, createdComment.newComment._id);
    await createNotif({
      id_sender: profile._id,
      id_receiver: post.id_profile,
      type_notif: "comment",
      created_at: new Date(),
    });
    const new_comment_profile = await getProfileById(
      createdComment.newComment.id_profile
    );
    const user = await getUserById(new_comment_profile.userId);
    console.log("user", user);
    const profile_new = await getProfileByUserId(user._id);
    console.log("profile_new", profile_new);
    // const profile = await getProfileByUserId(user._id);
    const enrichedComment = {
      ...createdComment.newComment,
      displayName: profile_new.display_name,
      profileName: user.pseudo,
    };
    setComments((prevComments) => [enrichedComment, ...prevComments]);

    setContent("");

    if (onPostCreated) onPostCreated(enrichedComment);
  }

  const contentComment = (
    <div
      className={`flex-col gap-4 fixed inset-0 z-50 flex items-center justify-center 
                  bg-black/40 scrollbar backdrop-blur-sm transition-opacity duration-300 
                  ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-11/12 sm:w-3/4 md:w-1/2 
              overflow-hidden rounded-2xl ring-2 ring-[#ff6600] 
              shadow-xl transition-transform duration-300 transform ${
                isVisible ? "scale-100" : "scale-90"
              }`}
      >
        <div className="max-h-[80vh] dark:bg-[#1F1F1F] bg-white overflow-y-auto p-6 pb-28">
          <h2 className="text-xl font-bold mb-6">Comments</h2>
          <div className="flex flex-col items-center gap-6">
            {comments
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((comment) => (
                <Comment
                  key={comment._id}
                  initialReplies={comment.replies || []}
                  id_comment={comment._id}
                  className="w-3/4"
                  displayName={comment.displayName}
                  profileName={comment.profileName}
                  content={comment.content}
                  dateCreation={new Date(comment.created_at).toLocaleString(
                    "fr-FR"
                  )}
                />
              ))}
          </div>
        </div>
      </div>
      <div
        id="buttons"
        className="flex flex-row items-center justify-center gap-0 w-11/12 sm:w-3/4 md:w-1/2"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          id="post-comment-button"
          className="flex flex-1 items-center gap-4 px-6 py-2
          dark:bg-gradient-to-b from-transparent to-[#1F1F1F]
                     backdrop-blur-md rounded-2xl ring-2 ring-[#ff6600] 
                      text-sm font-roboto select-none z-50"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something here..."
            className="h-8 resize-none outline-none bg-transparent
                       font-roboto text-base leading-[2] flex-1"
          />
          <svg
            className="w-5 h-5 aspect-square cursor-pointer"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSubmit}
          >
            <path
              d="M18.5903 0.181614C18.9673 0.408476 19.1651 0.800623 19.0942 1.19277L16.7056 14.6749C16.6496 14.9892 16.4294 15.2647 16.1084 15.4203C15.7875 15.5758 15.403 15.5953 15.0634 15.4721L10.5997 13.8614L8.04321 16.2629C7.71105 16.5773 7.18854 16.681 6.72949 16.5254C6.27043 16.3698 5.97186 15.9842 5.97186 15.5564V12.847C5.97186 12.7174 6.02784 12.5942 6.12861 12.497L12.3837 6.57264C12.6002 6.36847 12.5927 6.0541 12.3688 5.85965C12.1449 5.66519 11.7828 5.65223 11.5477 5.83696L3.95649 11.6932L0.660982 10.2608C0.265373 10.089 0.0115852 9.74547 0.000388726 9.36304C-0.0108078 8.98062 0.220587 8.62412 0.601268 8.43291L17.3214 0.136241C17.7207 -0.0614529 18.2134 -0.0420076 18.5903 0.181614Z"
              fill="#FF6600"
            />
          </svg>
        </div>

        <button onClick={handleClose} className="p-4">
          <svg
            className="w-8 h-8 aspect-square"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="13.5"
              cy="13.5"
              r="12.5"
              fill="#1F1F1F"
              stroke="#FF6600"
              strokeWidth="2"
            />
            <path
              d="M19.0342 9.62684C19.4935 9.1675 19.4935 8.42153 19.0342 7.96218C18.5749 7.50284 17.8289 7.50284 17.3695 7.96218L13.5 11.8354L9.62684 7.96586C9.1675 7.50651 8.42153 7.50651 7.96218 7.96586C7.50284 8.4252 7.50284 9.17118 7.96218 9.63052L11.8354 13.5L7.96586 17.3732C7.50651 17.8326 7.50651 18.5785 7.96586 19.0379C8.4252 19.4972 9.17118 19.4972 9.63052 19.0379L13.5 15.1647L17.3732 19.0342C17.8326 19.4935 18.5785 19.4935 19.0379 19.0342C19.4972 18.5749 19.4972 17.8289 19.0379 17.3695L15.1647 13.5L19.0342 9.62684Z"
              fill="#FF6600"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    contentComment,
    document.getElementById("modal-root")
  );
}

export default Comments;
