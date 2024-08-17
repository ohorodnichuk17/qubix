import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../../utils/api/apiClient";
import type { IPost } from "../../post/list/types";
import PostItemCard from "../../post/list/components/PostItemCard";

const PostsByTagPage = () => {
   const [posts, setPosts] = useState<IPost[]>([]);
   const location = useLocation();

   useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const tag = queryParams.get("tag");

      if (tag) {
         console.log(`Searching for posts with tag: ${tag}`);
         apiClient
            .post(`/api/post/search-posts-by-tags?tag=${tag}`)
            .then((res) => {
               console.log("API response:", res.data);
               setPosts(res.data);
            })
            .catch((error) => {
               console.error("Error fetching posts by tag:", error);
            });
      }
   }, [location.search]);

   return (
      <div>
         {posts.length > 0 ? (
            posts.map((post) => (
               <PostItemCard key={post.id} post={post} setPosts={setPosts}/>
            ))
         ) : (
            <p>No posts found for this tag.</p>
         )}
      </div>
   );
};

export default PostsByTagPage;