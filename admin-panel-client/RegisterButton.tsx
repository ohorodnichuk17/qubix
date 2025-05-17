import React from "react";
import { Button } from "antd";

const RegisterButton: React.FC = () => {
   const handleRegister = () => {
      window.location.href = "/register";
   };

   return (
      <Button type="primary" onClick={handleRegister}>
         Register
      </Button>
   );
};

export default RegisterButton;
