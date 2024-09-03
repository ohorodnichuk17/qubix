import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../../utils/api/apiClient";
import type { IPost } from "../../post/list/types";
import PostItemCard from "../../post/list/components/PostItemCard";
import { message } from "antd";

const PostsByTagPage = () => {
   const [posts, setPosts] = useState<IPost[]>([]);
   const [totalCount, setTotalCount] = useState<number>(0); // Add state for totalCount
   const location = useLocation();

   useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const tag = queryParams.get("tag");

      if (tag) {
         console.log(`Searching for posts with tag: ${tag}`);
         apiClient
             .post(`/api/post/search-posts-by-tags?tag=${tag}`)
             .then((res) => {
                setPosts(res.data);
                setTotalCount(res.data.length);
             })
             .catch(() => {
                message.error("Error fetching posts by tag:");
             });
      }
   }, [location.search]);

   return (
       <div>
          <p>Total Posts: {totalCount}</p>
          {posts.length > 0 ? (
              posts.map((post) => (
                  <PostItemCard
                      key={post.id}
                      post={post}
                      setPosts={setPosts}
                      setTotalCount={setTotalCount}
                  />
              ))
          ) : (
              <p>No posts found for this tag.</p>
          )}
       </div>
   );
};

export default PostsByTagPage;
