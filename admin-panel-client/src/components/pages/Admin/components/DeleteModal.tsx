import React from "react";
import { Modal, Button } from "antd";

interface DeleteModalProps {
   visible: boolean;
   modalType: string | null;
   onCancel: () => void;
   onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, modalType, onCancel, onDelete }) => {
   return (
      <Modal
         visible={visible}
         onCancel={onCancel}
         footer={[
            <Button key="cancel" onClick={onCancel}>
               Cancel
            </Button>,
            <Button key="delete" type="primary" danger onClick={onDelete}>
               {`Delete ${modalType?.split('-')[1]}`}
            </Button>,
         ]}
      >
         <p>Are you sure you want to delete this {modalType?.split('-')[1]}?</p>
      </Modal>
   );
};

export default DeleteModal;
