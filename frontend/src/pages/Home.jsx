import { useState, useEffect } from "react";
import Post from "../components/Post.jsx";
import PostCreationButton from "../components/PostCreation/PostCreation.jsx";
import PostCreationModal from "../components/PostCreation/PostCreationModal.jsx";
import { getAllPosts } from "../services/postService.js";
import { getUserById } from "../services/authService.js";
import { getProfileById } from "../services/profileService.js";
function Home() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const data = await getAllPosts();

      const postsWithExtras = await Promise.all(
        data.map(async (post) => {
          const profile = await getProfileById(post.id_profile);
          const user = await getUserById(profile.userId);

          return {
            ...post,
            avatar: profile.avatar,
            displayName: profile.display_name,
            profileName: user.pseudo,
          };
        })
      );

      setPosts(postsWithExtras);
    }

    getPosts();
  }, []);

  async function handlePostCreated(newPost) {
    const profile = await getProfileById(newPost.id_profile);
    const user = await getUserById(profile.userId);
    const enrichedPost = {
      ...newPost,
      avatar: profile.avatar,
      displayName: profile.display_name,
      profileName: user.pseudo,
    };

    setPosts((prevPosts) => [enrichedPost, ...prevPosts]);
  }

  return (
    <>
      <PostCreationButton
        onClick={() => setIsPostModalOpen(true)}
        className="z-20 h-8 fixed left-1/2 -translate-x-1/2 bottom-28 w-100"
      />

      {isPostModalOpen && (
        <PostCreationModal
          onClose={() => setIsPostModalOpen(false)}
          onPostCreated={handlePostCreated}
        />
      )}
      <div className="flex flex-col items-center gap-14 pt-24 pb-32 min-h-screen overflow-y-auto scrollbar w-full sm:w-3/4 md:w-3/5 ">
        {posts
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((post) => (
            <Post
              key={post._id}
              className="w-3/4"
              avatar={post.avatar}
              display_name={post.displayName}
              profileName={post.profileName}
              content={post.content}
              image={post.image}
              dateCreation={new Date(post.created_at).toLocaleString("fr-FR")}
              id_post={post._id}
              onPostCreated={handlePostCreated}
              isRepost={post.isRepost}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
