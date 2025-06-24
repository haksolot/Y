import { useState, useEffect } from "react";
import Post from "../components/Post.jsx";
import Notif from "../components/Notif.jsx";
import { getPostByIdProfile } from "../services/postService.js";
import { getUserById, getUserIdFromCookie } from "../services/authService.js";
import { getProfileByUserId } from "../services/profileService.js";
import { getProfileById } from "../services/profileService.js";
import { getNotifByIdReceiver } from "../services/notifService.js";
function Feed() {
  const [posts, setPosts] = useState([]);
  const [notif, setNotif] = useState([]);

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

      const flatPosts = allPosts.flat().map((post) => ({
        ...post,
        type: "post",
      }));
      setPosts(flatPosts);
    }
    getPosts();
  }, []);

  useEffect(() => {
    async function getNotif() {
      const userId = await getUserIdFromCookie();
      const receiverProfile = await getProfileByUserId(userId);
      const notifs = await getNotifByIdReceiver(receiverProfile._id);
      console.log("notifs", notifs);
      if (notifs.length === 0) return;
      const enrichedNotifs = await Promise.all(
        notifs.map(async (notif) => {
          console.log("notif", notif);
          const senderProfile = await getProfileById(notif.id_sender);
          const senderUser = await getUserById(senderProfile.userId);

          return {
            _id: notif._id,
            type: "notif",
            avatar: senderProfile.avatar,
            displayName: senderProfile.display_name,
            profileName: senderUser.pseudo,
            type_notif: notif.type_notif,
            created_at: notif.created_at,
          };
        })
      );

      setNotif(enrichedNotifs);
    }
    getNotif();
  }, []);

  const feedItems = [...posts, ...notif].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <>
      <div className="flex flex-col items-center gap-14 pt-24 pb-32 min-h-screen overflow-y-auto w-full sm:w-3/4 md:w-3/5">
        {feedItems.map((item) =>
          item.type === "post" ? (
            <Post
              key={item._id}
              className="w-3/4"
              avatar={item.avatar}
              display_name={item.displayName}
              profileName={item.profileName}
              content={item.content}
              dateCreation={new Date(item.created_at).toLocaleString("fr-FR")}
              id_post={item._id}
            />
          ) : (
            <Notif
              key={item._id}
              className="w-3/4"
              avatar={item.avatar}
              display_name_id_sender={item.displayName}
              profileName={item.profileName}
              type_notif={item.type_notif}
              created_at={new Date(item.created_at).toLocaleString("fr-FR")}
            />
          )
        )}
      </div>
    </>
  );
}

export default Feed;
