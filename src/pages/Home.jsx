import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { setPosts, setLoading, setError } from "../store/postSlice";

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (userData) {
      const fetchPosts = async () => {
        dispatch(setLoading(true));
        try {
          const post = await service.getPosts();
          if (post) {
            dispatch(setPosts(post.documents));
          } else {
            dispatch(setPosts([]));
          }
        } catch (error) {
          dispatch(setError(error.message || "Failed to fetch posts"));
        }
      };

      fetchPosts();
    }
  }, [userData, dispatch]);

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                <Link to="/login">Login to read posts</Link>
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 ">
      <Container>
        <h2 className="text-2xl font-bold mb-2">Home</h2>
        {loading && <p className="text-center w-full">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && posts.length === 0 && (
          <p className="text-center w-full">No posts found.</p>
        )}
        <div className="flex flex-wrap gap-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
