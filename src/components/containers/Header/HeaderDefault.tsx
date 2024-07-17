import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../../store/account/account.slice";
import { Layout } from "antd";
import LoggedInHeader from "./LoggedInHeader";
import NotLoggedInHeader from "./NotLoggedInHeader";
import "./HeaderDefault.css";

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

   const showDrawer = () => {
      setDrawerVisible(true);
   };

   const closeDrawer = () => {
      setDrawerVisible(false);
   };

   return (
      <Header className="custom-header">
         {isLogin ? (
            <LoggedInHeader
               handleLogout={handleLogout}
               drawerVisible={drawerVisible}
               showDrawer={showDrawer}
               closeDrawer={closeDrawer}
            />
         ) : (
            <NotLoggedInHeader />
         )}
      </Header>
   );
};

export default HeaderDefault;
