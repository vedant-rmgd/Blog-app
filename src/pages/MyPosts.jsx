import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";

function MyPosts() {
  const posts = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.auth.userData);
  const myPosts = posts.filter((post) => post.userId === userData.$id);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {myPosts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
