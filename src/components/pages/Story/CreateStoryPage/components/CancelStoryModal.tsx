import { Modal, type ModalProps } from "antd";

const CancelStoryModal: React.FC<ModalProps> = ({ ...props }) => (
	<Modal
		{...props}
		title="Cancel story?"
		okText="Cancel"
		okType="default"
		cancelText="Continue editing"
		cancelButtonProps={{ className: "gray-button" }}
	>
		<p>Are you sure you want to cancel this story? It will not be saved.</p>
	</Modal>
);

export default CancelStoryModal;
