import { Row } from "antd";
import type { IPost } from "../../../post/list/types";
import UserProfilePostItem from "./UserProfilePostItem";
import React from "react";

type UserProfilePostListProps = {
   posts: IPost[];
   setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
};

const UserProfilePostList = ({ posts, setPosts }: UserProfilePostListProps) => {
   if (posts.length <= 0) {
      return null;
   }

   return (
      <>
         <Row gutter={[16, 16]}>
            {posts.map((post) => (
               <UserProfilePostItem key={post.id} post={post} setPosts={setPosts} />
            ))}
         </Row>
      </>
   );
};

export default UserProfilePostList;
