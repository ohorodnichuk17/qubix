import React, { useState, useEffect } from "react";
import { Layout, Input, message } from "antd";
import UserTable from "./components/UserTable";
import PostTable from "./components/PostTable";
import CommentTable from "./components/CommentTable";
import StoryTable from "./components/StoryTable";
import UserModal from "./components/UserModal";
import DeleteModal from "./components/DeleteModal";
import { apiClient } from "../../../utils/api/apiClient";

const { Content } = Layout;

interface User {
   id: string;
   email: string;
}

interface Post {
   id: string;
   title: string;
   content: string;
   images: { id: string; imagePath: string }[];
}

interface Comment {
   id: string;
   message: string;
}

interface Story {
   id: string;
   content: string;
}

const AdminDashboard: React.FC = () => {
   const [users, setUsers] = useState<User[]>([]);
   const [posts, setPosts] = useState<Post[]>([]);
   const [comments, setComments] = useState<Comment[]>([]);
   const [stories, setStories] = useState<Story[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [email, setEmail] = useState<string>("");
   const [user, setUser] = useState<User | null>(null);
   const [selectedId, setSelectedId] = useState<string | null>(null);
   const [modalType, setModalType] = useState<string | null>(null);

   useEffect(() => {
      fetchAllUsers();
      fetchAllPosts();
      fetchAllComments();
      fetchAllStories();
   }, []);

   const fetchAllUsers = async () => {
      setLoading(true);
      try {
         const response = await apiClient.get("/api/admin/get-all-users");
         setUsers(response.data);
      } catch (error) {
         message.error("Error fetching users!");
      } finally {
         setLoading(false);
      }
   };

   const fetchAllPosts = async () => {
      setLoading(true);
      try {
         const response = await apiClient.get("/api/admin/get-all-posts");
         setPosts(response.data);
      } catch (error) {
         message.error("Error fetching posts!");
      } finally {
         setLoading(false);
      }
   };

   const fetchAllComments = async () => {
      setLoading(true);
      try {
         const response = await apiClient.get("/api/admin/get-all-comments");
         setComments(response.data);
      } catch (error) {
         message.error("Error fetching comments!");
      } finally {
         setLoading(false);
      }
   };

   const fetchAllStories = async () => {
      setLoading(true);
      try {
         const response = await apiClient.get("/api/admin/get-all-stories");
         setStories(response.data);
      } catch (error) {
         message.error("Error fetching stories!");
      } finally {
         setLoading(false);
      }
   };

   const fetchUserByEmail = async () => {
      setLoading(true);
      try {
         const response = await apiClient.get("/api/admin/get-user-by-email", {
            params: { email },
         });
         setUser(response.data);
         message.success("User found!");
      } catch (error) {
         message.error("Error fetching user by email!");
      } finally {
         setLoading(false);
      }
   };

   const handleAction = async (action: string, userId: string) => {
      setLoading(true);
      try {
         let endpoint = "";
         switch (action) {
            case "block":
               endpoint = "/api/admin/block-user";
               break;
            case "unblock":
               endpoint = "/api/admin/unblock-user";
               break;
            case "ban":
               endpoint = "/api/admin/ban-user";
               break;
            case "unban":
               endpoint = "/api/admin/unban-user";
               break;
         }

         await apiClient.post(endpoint, { id: userId });
         message.success(`User ${action}ed successfully!`);
         fetchAllUsers();
      } catch (error) {
         message.error(`Error during ${action}ing user!`);
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async () => {
      setLoading(true);
      try {
         let endpoint = "";
         switch (modalType) {
            case "delete-post":
               endpoint = "/api/admin/delete-post";
               break;
            case "delete-comment":
               endpoint = "/api/admin/delete-comment";
               break;
            case "delete-story":
               endpoint = "/api/admin/delete-story";
               break;
            default:
               break;
         }

         await apiClient.delete(endpoint, { data: { id: selectedId } });
         message.success("Deleted successfully!");
         setModalType(null);
         fetchAllUsers();
         fetchAllPosts();
         fetchAllComments();
         fetchAllStories();
      } catch (error) {
         message.error("Error deleting item!");
      } finally {
         setLoading(false);
      }
   };

   return (
      <Layout>
         <Content style={{ padding: "20px" }}>
            <Input.Search
               placeholder="Enter user email"
               enterButton="Search"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               onSearch={fetchUserByEmail}
               style={{ marginBottom: 20 }}
            />
            {user && <UserModal user={user} onClose={() => setUser(null)} />}
            <UserTable users={users} loading={loading} onAction={handleAction} onDelete={(id) => { setSelectedId(id); setModalType("delete-user"); }} />
            <PostTable posts={posts} loading={loading} onDelete={(id) => { setSelectedId(id); setModalType("delete-post"); }} />
            <CommentTable comments={comments} loading={loading} onDelete={(id) => { setSelectedId(id); setModalType("delete-comment"); }} />
            <StoryTable stories={stories} loading={loading} onDelete={(id) => { setSelectedId(id); setModalType("delete-story"); }} />
            <DeleteModal visible={!!modalType} modalType={modalType} onCancel={() => setModalType(null)} onDelete={handleDelete} />
         </Content>
      </Layout>
   );
};

export default AdminDashboard;
