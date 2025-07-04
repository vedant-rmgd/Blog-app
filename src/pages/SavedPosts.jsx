import { useDispatch, useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import { setSavedPosts } from "../store/postSlice";
import { useEffect } from "react";
import service from "../appwrite/config";

function SavedPosts() {
  const savedPosts = useSelector((state) => state.posts.savedPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (savedPosts.length > 0) {
      const validateSavedPosts = async () => {
        const validPosts = [];

        for (const post of savedPosts) {
          try {
            const existingPost = await service.getPost(post.$id);
            if (existingPost) {
              validPosts.push(existingPost);
            }
          } catch (error) {
            console.warn(`Post with ID ${post.$id} was deleted.`);
          }
        }

        dispatch(setSavedPosts(validPosts));
        localStorage.setItem("savedPosts", JSON.stringify(validPosts));
      };
      const timeout = setTimeout(() => {
        validateSavedPosts();
      }, 1000); 

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <h2 className="text-2xl font-bold mb-2">Saved Posts</h2>
        <div className="flex flex-wrap justify-center">
          {savedPosts.length > 0 ? (
            savedPosts.map((post) => (
              <div
                key={post.$createdAt}
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
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
