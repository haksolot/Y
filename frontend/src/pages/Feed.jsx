import { useState, useEffect } from "react";
import PostNotif from "../components/Post.jsx";
import { getPostByIdProfile } from "../services/postService.js";
import { getUserById, getUserIdFromCookie } from "../services/authService.js";
import { getProfileByUserId } from "../services/profileService.js";
import { getProfileById } from "../services/profileService.js";
function Feed() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const user = await getUserIdFromCookie();
      const profile = await getProfileByUserId(user);
      const following = profile.following;
      const allPosts = await Promise.all(
        following.map(async (follow) => {
          const posts = await getPostByIdProfile(follow);
          const profile = await getProfileById(follow);
          const user = await getUserById(profile.userId);

          return posts.map((post) => ({
            ...post,
            avatar: profile.avatar,
            displayName: profile.display_name,
            profileName: user.pseudo,
          }));
        })
      );

      const flatPosts = allPosts.flat();
      setPosts(flatPosts);
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
