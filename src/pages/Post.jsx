import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import storageService from "../appwrite/storageService";
import {
  setSelectedPost,
  addSavedPosts,
  removeSavedPosts,
  setLoading,
  setError,
  setPosts,
} from "../store/postSlice";

function Post() {
  const { posts, selectedPost, loading, error } = useSelector(
    (state) => state.posts
  );
  const savedPosts = useSelector((state) => state.posts.savedPosts);
  const isSaved = savedPosts.some((post) => post.$id === selectedPost?.$id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor =
    selectedPost && userData ? selectedPost.userId === userData.$id : false;
  const [localLoading, setLocalLoading] = useState(false);
  const postFromStore = posts.find((post) => post.$id === slug);

  useEffect(() => {
    if (postFromStore) {
      dispatch(setSelectedPost(postFromStore));
    } else {
      const fetchPosts = async () => {
        try {
          setLocalLoading(true);
          dispatch(setLoading(true));

          const post = await service.getPost(slug);

          if (post) {
            dispatch(setSelectedPost(post));
          } else {
            navigate("/");
          }
          dispatch(setLoading(false));
          setLocalLoading(false);
        } catch (error) {
          dispatch(setError(error.message || "Failed to fetch post"));
          dispatch(setLoading(false));
          setLocalLoading(false);
        }
      };
      fetchPosts();
    }

    return () => {
      dispatch(setError(null));
      dispatch(setSelectedPost(null));
    };
  }, [slug, postFromStore, dispatch, navigate]);

  const deletePost = () => {
    service.deletePost(selectedPost.$id).then((status) => {
      if (status) {
        storageService.deleteFile(selectedPost.featuredImage);
        dispatch(
          setPosts(posts.filter((post) => post.$id !== selectedPost.$id))
        );
        navigate("/");
      }
    });
    dispatch(removeSavedPosts(selectedPost.$id));

    const stored = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const updated = stored.filter((post) => post.$id !== selectedPost.$id);
    localStorage.setItem("savedPosts", JSON.stringify(updated));
  };

  const handleSave = () => {
    dispatch(addSavedPosts(selectedPost));
    const stored = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const updated = [...stored, selectedPost];
    localStorage.setItem("savedPosts", JSON.stringify(updated));
  };

  const handleUnsave = () => {
    dispatch(removeSavedPosts(selectedPost.$id));
    const stored = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const updated = stored.filter((post) => post.$id !== selectedPost.$id);
    localStorage.setItem("savedPosts", JSON.stringify(updated));
  };

  if (loading || localLoading) {
    return (
      <Container>
        <p className="text-center py-8">Loading post...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className="text-center text-red-500 py-8">{error}</p>
      </Container>
    );
  }

  if (!selectedPost) {
    return (
      <Container>
        <p className="text-center py-8">Post not found.</p>
      </Container>
    );
  }

  return selectedPost ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={storageService.getFilePreview(selectedPost.featuredImage)}
            alt={selectedPost.title}
            className="w-full max-w-[600px] max-h-[300px] object-cover rounded-lg"
            width={500}
          />
          <div className="absolute right-6 top-6">
            {isSaved ? (
              <Button
                onClick={handleUnsave}
                className="ml-2 mr-3"
                bgColor="bg-yellow-500"
              >
                Unsave
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                className="ml-2 mr-3"
                bgColor="bg-blue-500"
              >
                Save
              </Button>
            )}
            {isAuthor && (
              <>
                <Link to={`/edit-post/${selectedPost.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{selectedPost.title}</h1>
        </div>
        <div className="browser-css">{parse(selectedPost.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
