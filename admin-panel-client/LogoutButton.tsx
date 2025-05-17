import React from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux";
import { userLogout } from "../../../../store/account/account.actions";

const LogoutButton: React.FC = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         const result = await dispatch(userLogout()).unwrap();
         if (result) {
            message.success("Logged out successfully!");
            navigate("/login");
         }
      } catch (error) {
         message.error("Failed to logout!");
      }
   };

   return (
      <Button type="primary" onClick={handleLogout}>
         Logout
      </Button>
   );
};

export default LogoutButton;
