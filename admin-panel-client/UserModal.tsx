import React from "react";
import { Modal } from "antd";

interface User {
   id: string;
   email: string;
}

interface UserModalProps {
   user: User | null;
   onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
   return (
      <Modal visible={!!user} onCancel={onClose} footer={null} title="User Details">
         {user && (
            <>
               <p>Email: {user.email}</p>
               <p>ID: {user.id}</p>
            </>
         )}
      </Modal>
   );
};

export default UserModal;
