import storageService from "../appwrite/storageService";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">
        <div className="w-full justify-center mb-4">
          <img
            src={featuredImage ? storageService.getFilePreview(featuredImage) : "placeholder.png"}
            className="rounded-xl"
            style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
