import { Avatar, Layout, Menu, type MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
   action,
   createPost,
   feeling,
   friendsForSidePanel,
   memories,
   messengerForSidePanel,
} from "../../../utils/images/index";
import "./SideBar.css";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import useAvatar from "../../../hooks/useAvatar";
import CreatePostModal from "../../post/CreatePostModal";

const { Sider } = Layout;

export const SideBar = () => {
   const { user } = useAppSelector((state) => state.account);
   const isLogin = !!user;

   if (!isLogin) {
      return null;
   }

   const avatarImg = useAvatar();

   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => setIsModalOpen(true);

   const handleOk = () => setIsModalOpen(false);

   const handleCancel = () => setIsModalOpen(false);

   const menuItems: MenuProps["items"] = [
      {
         key: "1",
         label: "Messenger",
         icon: (
            <img
               src={messengerForSidePanel}
               alt="Messenger"
               className="menu-icon"
            />
         ),
      },
      {
         key: "2",
         label: "Search friends",
         icon: (
            <img
               src={friendsForSidePanel}
               alt="Search Friends"
               className="menu-icon"
            />
         ),
      },
      {
         key: "3",
         label: "Memories",
         icon: <img src={memories} alt="Memories" className="menu-icon" />,
      },
      {
         key: "4",
         label: "Feelings",
         icon: <img src={feeling} alt="Feelings" className="menu-icon" />,
      },
      {
         key: "5",
         label: "Actions",
         icon: <img src={action} alt="Actions" className="menu-icon" />,
      },
      {
         key: "6",
         label: "Create post",
         icon: <img src={createPost} alt="Create Post" className="menu-icon" />,
         onClick: showModal,
      },
   ];

   return (
      <Layout>
         <Sider
            width={250}
            style={{
               background: "#fff",
               height: "calc(100vh - 64px)",
               position: "fixed",
               left: 0,
               top: 64,
               boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
         >
            <div className="avatar-container">
               <Link to="/profile" style={{ color: "black" }}>
                  <Avatar src={avatarImg} size={50} />
                  <span style={{ color: "black", marginLeft: "8px" }}>{user?.firstName}</span>{" "}
                  <span style={{ color: "black" }}>{user?.lastName}</span>
               </Link>
            </div>
            <Menu
               mode="inline"
               style={{ height: "100%", borderRight: 0 }}
               items={menuItems}
            />
            <CreatePostModal
               isModalOpen={isModalOpen}
               handleOk={handleOk}
               handleCancel={handleCancel}
            />
         </Sider>
      </Layout>
   );
};

export default SideBar;
