import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../../utils/api/apiClient";
import type { IPaginationResponse, IPost } from "./types";
import PostItemCard from "./components/PostItemCard";

const PostList = () => {
   const [posts, setPosts] = useState<IPost[]>([]);
   const [totalCount, setTotalCount] = useState<number>(1);
   const [pageNumber, setPageNumber] = useState(1);
   const [loading, setLoading] = useState(false);
   const observerRef = useRef<IntersectionObserver | null>(null);
   const sentinelRef = useRef<HTMLDivElement | null>(null);
   const pageSize = 10;

   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
      if (posts.length >= totalCount) return;

      const fetchPosts = async () => {
         setLoading(true);
         try {
            const response = await apiClient.get<IPaginationResponse>(
               "/api/post/friends",
               {
                  params: { pageNumber, pageSize },
               },
            );
            const { totalCount, posts } = response.data;
            setTotalCount(totalCount);
            setPosts((prevPosts) => [...prevPosts, ...posts]);
         } catch { }
         setLoading(false);
      };
      fetchPosts();
   }, [pageNumber]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting && !loading) {
               setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
         },
         { threshold: 1.0 },
      );

      if (observerRef.current) observerRef.current.disconnect();

      const sentinel = sentinelRef.current;
      if (sentinel) observer.observe(sentinel);

      observerRef.current = observer;

      return () => {
         if (observerRef.current) observerRef.current.disconnect();
      };
   }, [loading]);

   if (posts.length === 0) return null;

   return (
      <>
         {posts.map((post) => (
            <PostItemCard key={post.id} post={post} setPosts={setPosts} />
         ))}
         {loading && <p>Loading...</p>}
         <div ref={sentinelRef} style={{ height: "1px" }} />
      </>
   );
};

export default PostList;
