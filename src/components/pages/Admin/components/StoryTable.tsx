import React from "react";
import { Table, Button } from "antd";

interface Story {
   id: string;
   content: string;
}

interface StoryTableProps {
   stories: Story[];
   loading: boolean;
   onDelete: (storyId: string) => void;
}

const StoryTable: React.FC<StoryTableProps> = ({ stories, loading, onDelete }) => {
   const columns = [
      {
         title: "Content",
         dataIndex: "content",
         key: "content",
      },
      {
         title: "Actions",
         key: "actions",
         render: (record: Story) => (
            <Button type="primary" danger onClick={() => onDelete(record.id)}>
               Delete
            </Button>
         ),
      },
   ];

   return <Table columns={columns} dataSource={stories} rowKey="id" loading={loading} title={() => "Stories"} />;
};

export default StoryTable;
