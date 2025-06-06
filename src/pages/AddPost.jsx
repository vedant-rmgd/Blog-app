import { Container, PostForm } from "../components/index";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <h2 className="text-2xl font-bold mb-2">Add Post</h2>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;