import React, { useState, useEffect } from "react";
import { Layout, Input, message } from "antd";
import UserTable from "./components/UserTable";
import PostTable from "./components/PostTable";
import CommentTable from "./components/CommentTable";
import StoryTable from "./components/StoryTable";
import UserModal from "./components/UserModal";
import DeleteModal from "./components/DeleteModal";
import { apiClient } from "../../../utils/api/apiClient";
import LogoutButton from "./components/LogoutButton";
import RegisterButton from "./components/RegisterButton";
import './AdminDashboard.css'
import { User, Post, Story, Comment } from "./types";
import { useAppSelector } from "../../../hooks/redux";
import LoginButton from "./components/LoginButton";

const { Content } = Layout;

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

   const { isLogin } = useAppSelector((state) => state.account);

   useEffect(() => {
      if (isLogin) {
         fetchAllUsers();
         fetchAllPosts();
         fetchAllComments();
         fetchAllStories();
      }
   }, [isLogin]);

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
            case "delete-user":
               endpoint = "/api/admin/delete";
               break;
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

   return isLogin ? (
      <Layout>
         <Content style={{ padding: "10px", maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
               <RegisterButton />
               <LogoutButton />
               <Input.Search
                  placeholder="Enter user email"
                  enterButton="Search"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onSearch={fetchUserByEmail}
                  style={{ width: "100%", maxWidth: "400px" }}
               />
            </div>

            {user && <UserModal user={user} onClose={() => setUser(null)} />}
            <div style={{ overflowX: "auto" }}>
               <UserTable users={users} loading={loading} onAction={handleAction} onDelete={(id) => { setSelectedId(id); setModalType("delete-user"); }} />
               <PostTable posts={posts} loading={loading} onDelete={(id) => { setSelectedId(id); setModalType("delete-post"); }} />
               <CommentTable comments={comments} loading={loading} onDelete={(id) => { setSelectedId(id); setModalType("delete-comment"); }} />
               <StoryTable stories={stories} loading={loading} onDelete={(id) => { setSelectedId(id); setModalType("delete-story"); }} />
            </div>
            <DeleteModal visible={!!modalType} modalType={modalType} onCancel={() => setModalType(null)} onDelete={handleDelete} />
         </Content>
      </Layout>
   ) : (
      <Layout className="admin-dashboard">
         <Content style={{ padding: "20px", textAlign: "center" }}>
            <div className="not-logged-in">
               <h1>Welcome to Admin Dashboard</h1>
               <p>Please log in to access the administration panel.</p>
               <div className="decorative-element"></div>
               <div className="login-button-container">
                  <LoginButton />
               </div>
            </div>
         </Content>
      </Layout>
   );

};

export default AdminDashboard;