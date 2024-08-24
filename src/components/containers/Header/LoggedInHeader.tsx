import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Drawer, Dropdown, Input, Menu, message, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import useAvatar from "../../../hooks/useAvatar";
import { userLogout } from "../../../store/account/account.actions";
import { activeFriends, activeHome, activeMessanger, activePlus, friends, glyph, home, logo, messanger, plus } from "../../../utils/images";
import { apiClient } from "../../../utils/api/apiClient";

const LoggedInHeader = () => {
   const { user } = useAppSelector((state) => state.account);
   const [countOfFriendRequests, setCountOfFriendRequests] = useState<number>(0);
   const avatarImg = useAvatar();

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [drawerVisible, setDrawerVisible] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   const handleLogout = async () => {
      if (!user?.id) {
         message.error("Logout error!");
         return;
      }
      try {
         const result = await dispatch(userLogout()).unwrap();
         if (result) {
            navigate("/");
         }
      } catch {
         message.error("Failed to logout.");
      }
   };

   const showDrawer = () => {
      setDrawerVisible(true);
   };

   const closeDrawer = () => {
      setDrawerVisible(false);
   };

   const menuItems = [
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

   const drawerMenuItems = [
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

   useEffect(() => {
      if (user === null) {
         return;
      }
      apiClient.get(`/api/friends/requests?UserId=${user.id}`).then((res) => {
         setCountOfFriendRequests(res.data.length);
      });
   }, [user]);

   const handleSearch = async () => {
      if (searchTerm.startsWith("#")) {
         const tag = searchTerm.slice(1);
         navigate(`/search/posts?tag=${tag}`);
      } else {
         const [firstName, lastName] = searchTerm.trim().split(" ");

         if (firstName && lastName) {
            navigate(`/search/friends?firstName=${firstName}&lastName=${lastName}`);
         } else {
            message.error("Both first name and last name are required.");
         }
      }
   };

   return (
      <>
         <div className="navbar-left">
            <NavLink to="/" style={{ display: 'flex' }}>
               <img src={logo} alt="logo" className="logo" />
            </NavLink>
            <Input
               className="search-bar"
               placeholder="Search friends or posts by tag"
               prefix={<SearchOutlined style={{ color: "#000000" }} />}
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onPressEnter={handleSearch}
            />
         </div>
         <div className="navbar-center">
            <Tooltip title="Home">
               <NavLink to="/" className="nav-icon home-icon-link">
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
               <Badge count={countOfFriendRequests} color="orange">
                  <NavLink to="/friends" className="nav-icon friends-icon-link">
                     {({ isActive }) => (
                        <img
                           src={isActive ? activeFriends : friends}
                           alt="Friends"
                           className="nav-icon-img friends-icon"
                        />
                     )}
                  </NavLink>
               </Badge>
            </Tooltip>
            <Tooltip title="Create New Story">
               <NavLink to="/story" className="nav-icon story-icon-link">
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
               <NavLink to="/messenger" className="nav-icon messanger-icon-link">
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
               <Dropdown menu={{ items: menuItems }}>
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
   );
};

export default LoggedInHeader;
