import { useDispatch, useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import { setSavedPosts } from "../store/postSlice";
import { useEffect } from "react";

function SavedPosts() {
  const savedPosts = useSelector((state) => state.posts.savedPosts);
  const dispatch = useDispatch();
  console.log(savedPosts);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedPosts")) || [];
    dispatch(setSavedPosts(stored));
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <h2 className="text-2xl font-bold mb-2">Saved Posts</h2>
        <div className="flex flex-wrap justify-center">
          {savedPosts.length > 0 ? (
            savedPosts.map((post) => (
              <div key={post.$createdAt} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-2xl text-orange-500">No saved posts yet.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default SavedPosts;
