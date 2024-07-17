import {
   MenuOutlined,
   SearchOutlined,
   UserAddOutlined,
   UserOutlined,
} from "@ant-design/icons";
import {
   Avatar,
   Button,
   Drawer,
   Dropdown,
   Input,
   Layout,
   Menu,
   type MenuProps,
   Tooltip,
} from "antd";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../../store/account/account.slice";
import "./HeaderDefault.css";
import useAvatar from "../../../hooks/useAvatar";
import {
   activeFriends,
   activeHome,
   activeMessanger,
   activePlus,
   friends,
   glyph,
   home,
   logo,
   messanger,
   plus,
} from "../../../utils/images";

const { Header } = Layout;

const HeaderDefault = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { isLogin } = useAppSelector((state) => state.account);
   const [drawerVisible, setDrawerVisible] = useState(false);

   const handleLogout = async () => {
      await dispatch(logout());
      navigate("/");
   };

   const avatarImg = useAvatar();

   const menuitems: MenuProps["items"] = [
      {
         label: <NavLink to="/profile">Profile</NavLink>,
         key: "1",
      },
      {
         label: <NavLink to="/settings">Settings and privacy</NavLink>,
         key: "2",
      },
      {
         label: "Logout",
         key: "3",
         onClick: handleLogout,
      },
   ];

   const showDrawer = () => {
      setDrawerVisible(true);
   };

   const closeDrawer = () => {
      setDrawerVisible(false);
   };

   const drawerMenuItems: MenuProps["items"] = [
      {
         label: <NavLink to="/">Home</NavLink>,
         key: "1",
      },
      {
         label: <NavLink to="/friends">Friends</NavLink>,
         key: "2",
      },
      {
         label: <NavLink to="/story">Story</NavLink>,
         key: "3",
      },
      {
         label: <NavLink to="/messenger">Messenger</NavLink>,
         key: "4",
      },
   ];

   return (
      <Header className="custom-header">
         {isLogin ? (
            <>
               <div className="navbar-left">
                  <img src={logo} alt="logo" className="logo" />
                  <Input
                     className="search-bar"
                     placeholder="Search"
                     prefix={<SearchOutlined style={{ color: "#000000" }} />}
                  />
               </div>
               <div className="navbar-center">
                  <Tooltip title="Home">
                     <NavLink
                        to="/"
                        className="nav-icon home-icon-link"
                     >
                        {({ isActive }) => (
                           <img
                              src={isActive ? activeHome : home}
                              alt="Home"
                              className="nav-icon-img home-icon"
                           />
                        )}
                     </NavLink>
                  </Tooltip>
                  <Tooltip title="Friends">
                     <NavLink
                        to="/friends"
                        className="nav-icon friends-icon-link"
                     >
                        {({ isActive }) => (
                           <img
                              src={isActive ? activeFriends : friends}
                              alt="Friends"
                              className="nav-icon-img friends-icon"
                           />
                        )}
                     </NavLink>
                  </Tooltip>
                  <Tooltip title="Create New Story">
                     <NavLink
                        to="/story"
                        className="nav-icon story-icon-link"
                     >
                        {({ isActive }) => (
                           <img
                              src={isActive ? activePlus : plus}
                              alt="Story"
                              className="nav-icon-img story-icon"
                           />
                        )}
                     </NavLink>
                  </Tooltip>
                  <Tooltip title="Messenger">
                     <NavLink
                        to="/messenger"
                        className="nav-icon messanger-icon-link"
                     >
                        {({ isActive }) => (
                           <img
                              src={isActive ? activeMessanger : messanger}
                              alt="Messenger"
                              className="nav-icon-img messanger-icon"
                           />
                        )}
                     </NavLink>
                  </Tooltip>
               </div>
               <div className="navbar-right">
                  <div className="avatar-dropdown-container">
                     <Avatar src={avatarImg} size={50} />
                     <Dropdown menu={{ items: menuitems }} trigger={["click"]}>
                        <Button
                           className="avatar-dropdown-button"
                           icon={<img src={glyph} alt="dropdown" />}
                        />
                     </Dropdown>
                  </div>
               </div>
               <Button
                  className="menu-button"
                  type="primary"
                  icon={<MenuOutlined />}
                  onClick={showDrawer}
               />
               <Drawer
                  title="Menu"
                  placement="right"
                  onClose={closeDrawer}
                  open={drawerVisible}
               >
                  <Menu mode="vertical" items={drawerMenuItems} />
               </Drawer>
            </>
         ) : (
            <>
               <div className="left-section">
                  <Input
                     className="search-bar"
                     placeholder="Search"
                     prefix={<SearchOutlined style={{ color: "#000000" }} />}
                  />
               </div>
               <div className="center-section">
                  <img src={logo} alt="logo" className="header-logo" />
                  <div className="header-text">
                     <span className="header-text-regular">This is</span>
                     <span className="header-text-bold">Qubix</span>
                  </div>
               </div>
               <div className="right-section">
                  <NavLink
                     to="/login"
                     style={{ color: "#FFFAFA", textDecoration: "none" }}
                  >
                     <Button icon={<UserOutlined />} className="gradient-button login">
                        Login
                     </Button>
                  </NavLink>
                  <NavLink
                     to="/register"
                     style={{ color: "#FFFAFA", textDecoration: "none" }}
                  >
                     <Button
                        icon={<UserAddOutlined />}
                        className="gradient-button register"
                     >
                        Register
                     </Button>
                  </NavLink>
               </div>
            </>
         )}
      </Header>
   );
};

export default HeaderDefault;
