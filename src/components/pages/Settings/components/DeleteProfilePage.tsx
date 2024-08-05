import { useState } from "react";
import { Button, Modal, Typography, message } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";

const { Title, Paragraph } = Typography;

const StyledButton = styled(Button)`
  background-color: #FF7F50;
  border-color: #FF7F50;
  &:hover {
    background-color: #FF6347;
    border-color: #FF6347;
  }
`;

const DeleteProfilePage = () => {
   const { user } = useAppSelector((state) => state.account);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const navigate = useNavigate();

   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleOk = () => {
      if (user?.id) {
         apiClient
            .delete(`/api/user-profile/delete-profile`, {
               data: { Id: user.id },
            })
            .then(() => {
               message.success("Account deleted successfully!");
               navigate("/account-deleted-successfully");
            })
            .catch(() => {
               message.error("Failed to delete account");
            });


      }
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   return (
      <div>
         <Title level={2}>Delete Account</Title>
         <Paragraph>
            Deleting your account will remove all your data permanently. This action
            cannot be undone. Are you sure you want to proceed?
         </Paragraph>
         <StyledButton onClick={showModal}>Delete Account</StyledButton>
         <Modal
            title="Confirm Account Deletion"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes, delete my account"
            cancelText="Cancel"
         >
            <Paragraph>
               Are you sure you want to delete your account? This action cannot be undone.
            </Paragraph>
         </Modal>
      </div>
   );
};

export default DeleteProfilePage;
