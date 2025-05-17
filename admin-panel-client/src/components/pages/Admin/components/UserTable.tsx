import React from "react";
import { Table, Button } from "antd";
import { User } from "../types";

interface UserTableProps {
   users: User[];
   loading: boolean;
   onAction: (action: string, userId: string) => void;
   onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading, onAction, onDelete }) => {
   const columns = [
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
      },
      {
         title: "Role",
         dataIndex: "role",
         key: "role",
      },
      {
         title: "Actions",
         key: "actions",
         render: (record: User) => (
            <>
               <Button type="primary" danger onClick={() => onAction("ban", record.id)} style={{ marginRight: 8 }}>
                  Ban
               </Button>
               <Button type="primary" onClick={() => onAction("unban", record.id)} style={{ marginRight: 8 }}>
                  Unban
               </Button>
               <Button type="primary" danger onClick={() => onDelete(record.id)} style={{ marginRight: 8 }}>
                  Delete
               </Button>
            </>
         ),
      },
   ];

   return <Table columns={columns} dataSource={users} rowKey="id" loading={loading} title={() => "Users"} style={{ marginBottom: 20 }} />;
};

export default UserTable;
