import React from "react";
import { Button } from "antd";

const LoginButton: React.FC = () => {
   const handleRegister = () => {
      window.location.href = "/login";
   };

   return (
      <Button type="primary" onClick={handleRegister}>
         Login
      </Button>
   );
};

export default LoginButton;
