import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPost, setError, setLoading } from "../store/postSlice";

function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, selectedPost, loading, error } = useSelector(
    (state) => state.posts
  );
  const [localLoading, setLocalLoading] = useState(false);

  const postFromStore = posts.find((post) => post.$id === slug);

  useEffect(() => {
    if (postFromStore) {
      dispatch(setSelectedPost(postFromStore));
    } else {
      const fetchPost = async () => {
        try {
          setLocalLoading(true);
          dispatch(setLoading(true));
          const post = await service.getPost(slug);
          if (post) {
            dispatch(setSelectedPost(post));
          } else {
            navigate("/");
          }
        } catch (err) {
          dispatch(setError(err.message || "Failed to fetch post"));
        } finally {
          dispatch(setLoading(false));
          setLocalLoading(false);
        }
      };
      fetchPost();
    }

    return () => {
      dispatch(setSelectedPost(null));
      dispatch(setError(null));
    };
  }, [slug, postFromStore, dispatch, navigate]);

  if (loading || localLoading) {
    return (
      <Container>
        <p className="text-center py-8">Loading post for editing...</p>
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
        <PostForm post={selectedPost} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
