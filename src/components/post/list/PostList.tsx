import { useEffect, useState } from "react";
import { apiClient } from "../../../utils/api/apiClient";
import type { IPost } from "./types";
import PostItemCard from "./components/PostItemCard";

const PostList = () => {
   const [posts, setPosts] = useState<IPost[]>([]);

   useEffect(() => {
      apiClient
         .get("/api/post/getAll")
         .then((res) => {
            console.log(res);
            setPosts(res.data);
         })
         .catch((error) => {
            console.error(error);
         });
   }, []);

   return (
      <>
         {posts.map((post) => (
            <PostItemCard key={post.id} post={post} setPosts={setPosts} />
         ))}
      </>
   );
};

export default PostList;