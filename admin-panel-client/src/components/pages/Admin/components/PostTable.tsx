import React from "react";
import { Table, Button, Carousel } from "antd";
import { APP_ENV } from "../../../../env/index";

interface Post {
   id: string;
   title: string;
   content: string;
   images: { id: string; imagePath: string }[];
}

interface PostTableProps {
   posts: Post[];
   loading: boolean;
   onDelete: (postId: string) => void;
}

const PostTable: React.FC<PostTableProps> = ({ posts, loading, onDelete }) => {
   const columns = [
      {
         title: "Title",
         dataIndex: "title",
         key: "title",
      },
      {
         title: "Content",
         dataIndex: "content",
         key: "content",
      },
      {
         title: "Images",
         dataIndex: "images",
         key: "images",
         render: (images: { id: string; imagePath: string }[]) => (
            <Carousel arrows>
               {images.map((image) => (
                  <img key={image.id} src={`${APP_ENV.BASE_URL}/images/posts/${image.imagePath}`} alt="Post image" style={{ maxWidth: "100px", maxHeight: "100px", marginRight: 8 }} />
               ))}
            </Carousel>
         ),
      },
      {
         title: "Actions",
         key: "actions",
         render: (record: Post) => (
            <Button type="primary" danger onClick={() => onDelete(record.id)}>
               Delete
            </Button>
         ),
      },
   ];

   return <Table columns={columns} dataSource={posts} rowKey="id" loading={loading} title={() => "Posts"} style={{ marginBottom: 20 }} />;
};

export default PostTable;
