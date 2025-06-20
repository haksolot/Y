import { useState, useEffect } from "react";
import PostNotif from "../components/Post.jsx";
import { getAllPosts, getFollowedPosts } from "../services/postService.js";
import { getUserById } from "../services/authService.js";
import { getProfileByUserId } from "../services/profileService.js";
function Feed() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const data = await getFollowedPosts();
      const PostWithName = [];
      for (const post of data) {
        const user = await getUserById(post.id_profile);
        const profile = await getProfileByUserId(user._id);
        PostWithName.push({
          ...post,
          avatar: profile.avatar,
          displayName: profile.display_name,
          profileName: user.pseudo,
        });
      }
      setPosts(PostWithName);
    }
    getPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-14 pt-24 pb-32 min-h-screen overflow-y-auto w-full sm:w-3/4 md:w-3/5">
        {posts
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((post) => (
            <PostNotif
              key={post._id}
              className="w-3/4"
              avatar={post.avatar}
              display_name={post.displayName}
              profileName={post.profileName}
              content={post.content}
              dateCreation={new Date(post.created_at).toLocaleString("fr-FR")}
              id_post={post._id}
            />
          ))}
      </div>
    </>
  );
}

export default Feed;
