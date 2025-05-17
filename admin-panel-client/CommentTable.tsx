import React from "react";
import { Table, Button } from "antd";

interface Comment {
   id: string;
   message: string;
}

interface CommentTableProps {
   comments: Comment[];
   loading: boolean;
   onDelete: (commentId: string) => void;
}

const CommentTable: React.FC<CommentTableProps> = ({ comments, loading, onDelete }) => {
   const columns = [
      {
         title: "Message",
         dataIndex: "message",
         key: "message",
      },
      {
         title: "Actions",
         key: "actions",
         render: (record: Comment) => (
            <Button type="primary" danger onClick={() => onDelete(record.id)}>
               Delete
            </Button>
         ),
      },
   ];

   return <Table columns={columns} dataSource={comments} rowKey="id" loading={loading} title={() => "Comments"} style={{ marginBottom: 20 }} />;
};

export default CommentTable;
