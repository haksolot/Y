import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Comment from "./Comment";
import {
  addCommentOnPost,
  createComment,
  getPostById,
} from "../../services/postService";
import {
  getUserIdFromCookie,
  getCommentById,
} from "../../services/postService";
import { getUserById } from "../../services/authService";
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
        console.log("Données du post :", data);
        const comments = data.commentaries;
        const commentsData = await Promise.all(
          comments.map((id) => getCommentById(id))
        );
        const enrichedComments = await Promise.all(
          commentsData.map(async (comment) => {
            const user = await getUserById(comment.id_profile);
            return {
              ...comment,
              profileName: user.pseudo,
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
    const newComment = {
      content,
      created_at: new Date().toISOString(),
      id_profile: userId || "Unknown",
    };

    const createdComment = await createComment(newComment);
    await addCommentOnPost(id_post, createdComment.newComment._id);

    const user = await getUserById(createdComment.newComment.id_profile);

    const enrichedComment = {
      ...createdComment.newComment,
      profileName: user.pseudo,
    };

    setComments((prevComments) => [enrichedComment, ...prevComments]);

    setContent("");

    if (onPostCreated) onPostCreated(enrichedComment);
  }

  const contentComment = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
                  bg-black/40 backdrop-blur-sm transition-opacity duration-300 
                  ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-11/12 sm:w-3/4 md:w-1/2 max-h-[80vh] 
                    overflow-y-auto bg-[#1F1F1F] p-6 pb-28 
                    rounded-2xl ring-2 ring-[#ff6600] shadow-xl 
                    transition-transform duration-300 transform ${
                      isVisible ? "scale-100" : "scale-90"
                    }`}
      >
        <h2 className="text-white text-xl font-bold mb-6">Comments</h2>
        <div className="flex flex-col items-center gap-6">
          {comments
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((comment) => (
              <Comment
                key={comment.id}
                className="w-3/4"
                profileName={comment.profileName}
                content={comment.content}
                dateCreation={new Date(comment.created_at).toLocaleString(
                  "fr-FR"
                )}
              />
            ))}
        </div>

        {/* Zone de saisie fixée en bas du modal */}
        <div
          id="post-comment-button"
          className="fixed bottom-10 left-1/2 -translate-x-1/2 
                     flex items-center gap-4 px-6 py-2
                     bg-gradient-to-b from-transparent to-[#1F1F1F] 
                     backdrop-blur-md rounded-2xl ring-2 ring-[#ff6600] 
                     text-[#ffffffcc] text-sm font-roboto select-none z-50"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something here..."
            className="h-8 resize-none outline-none bg-transparent text-white 
                       font-roboto text-base leading-[2] w-64"
          />
          <svg
            className="w-4 h-4 aspect-square"
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

        <button
          onClick={handleClose}
          className="mt-6 px-4 py-2 text-sm bg-orange-600 rounded hover:bg-orange-700 text-white"
        >
          Fermer
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
