import Post from "../components/Post.jsx";

function Home() {
  return (
    <div className="flex flex-col items-center gap-14 pt-24 pb-32 min-h-screen overflow-y-auto">
      <Post className="w-3/4" />
      <Post className="w-3/4" />
      <Post className="w-3/4" />
      <Post className="w-3/4" />
      <Post className="w-3/4" />
      <Post className="w-3/4" />
      <Post className="w-3/4" />
      <Post className="w-3/4" />
    </div>
  );
}

export default Home;
