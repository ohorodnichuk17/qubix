import { Avatar, Grid, Layout, Menu, type MenuProps } from "antd";
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
import CreatePostModal from "../../post/create/CreatePostModal";
import FeelingModal from "../../feelings/FeelingModal";
const { useBreakpoint } = Grid;

const { Sider } = Layout;

export const SideBar = () => {
   const { user, isLogin } = useAppSelector((state) => state.account);
   const avatarImg = useAvatar();
   const screens = useBreakpoint();
   const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
   const [isFeelingModalOpen, setIsFeelingModalOpen] = useState(false);

   if (!isLogin) {
      return null;
   }

   const showCreatePostModal = () => setIsCreatePostModalOpen(true);
   const handleCreatePostOk = () => setIsCreatePostModalOpen(false);
   const handleCreatePostCancel = () => setIsCreatePostModalOpen(false);

   const showFeelingModal = () => setIsFeelingModalOpen(true);
   const handleFeelingOk = () => setIsFeelingModalOpen(false);
   const handleFeelingCancel = () => setIsFeelingModalOpen(false);

   const isScreenSmallerThatMd =
      (screens.xs || screens.sm) &&
      !screens.md &&
      !screens.lg &&
      !screens.xl &&
      !screens.xxl;

   const menuItems: MenuProps["items"] = [
      {
         key: "1",
         label: (
            <Link to="/messenger" className="menu-link">
               Messenger
            </Link>
         ),
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
         label: (
            <Link to="/friends" className="menu-link">
               Search Friends
            </Link>
         ),
         icon: (
            <img
               src={friendsForSidePanel}
               alt="Search Friends"
               className="menu-icon"
            />
         ),
      },
      //{
      //   key: "3",
      //   label: "Memories",
      //   icon: <img src={memories} alt="Memories" className="menu-icon" />,
      //},
      {
         key: "3",
         label: (
            <Link to="/memories" className="menu-link">
               Memories
            </Link>
         ),
         icon: (
            <img
               src={memories}
               alt="Memories"
               className="menu-icon"
            />
         ),
      },
      {
         key: "4",
         label: "Feelings",
         icon: <img src={feeling} alt="Feelings" className="menu-icon" />,
         onClick: showFeelingModal,
      },
      {
         key: "5",
         label: "Actions",
         icon: <img src={action} alt="Actions" className="menu-icon" />,
         onClick: showFeelingModal,
      },
      {
         key: "6",
         label: "Create post",
         icon: <img src={createPost} alt="Create Post" className="menu-icon" />,
         onClick: showCreatePostModal,
      },
   ];

   return (
      <Sider
         width={250}
         style={{
            background: "#fff",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            scrollbarWidth: "thin",
            scrollbarColor: "unset",
         }}
         breakpoint="md"
         collapsedWidth="80"
      >
         <div
            style={{
               position: "fixed",
               top: 64,
               width: "100%",
               maxWidth: isScreenSmallerThatMd ? 80 : 250,
               paddingTop: isScreenSmallerThatMd ? 10 : 0,
            }}
         >
            {!isScreenSmallerThatMd && (
               <div className="avatar-container">
                  <Link to="/profile" style={{ color: "black" }}>
                     <Avatar src={avatarImg} size={50} />
                     <span
                        className="user-name"
                        style={{ color: "black", marginLeft: "8px" }}
                     >
                        {user?.firstName}
                     </span>{" "}
                     <span className="user-name" style={{ color: "black" }}>
                        {user?.lastName}
                     </span>
                  </Link>
               </div>
            )}
            <Menu
               mode="inline"
               style={{ height: "100%", borderRight: 0 }}
               items={menuItems}
            />
            <CreatePostModal
               isModalOpen={isCreatePostModalOpen}
               handleOk={handleCreatePostOk}
               handleCancel={handleCreatePostCancel}
            />
            <FeelingModal
               isModalOpen={isFeelingModalOpen}
               handleOk={handleFeelingOk}
               handleChangeAction={() => { }}
               handleChangeSubAction={() => { }}
               handleCancel={handleFeelingCancel} />
         </div>
      </Sider>
   );
};

export default SideBar;
