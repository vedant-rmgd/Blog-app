import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";

function MyPosts() {
  const posts = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.auth.userData);
  const myPosts = posts.filter((post) => post.userId === userData.$id);

  return (
    <div className="w-full py-8">
      <Container>
        <h2 className="text-2xl font-bold mb-2">My Posts</h2>
        <div className="flex flex-wrap">
          {myPosts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
