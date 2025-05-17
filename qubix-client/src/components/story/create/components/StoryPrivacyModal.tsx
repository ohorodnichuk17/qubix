import { Modal, type ModalProps } from "antd";

const StoryPrivacyModal: React.FC<ModalProps> = ({ ...props }) => (
	<Modal
		{...props}
		title="Privacy of story"
		okText="Save"
		okType="default"
		cancelButtonProps={{ className: "gray-button" }}
	>
		<p>Who can see your story?</p>
		<p>Your story will be visible on Quilt for 24 hours.</p>
	</Modal>
);

export default StoryPrivacyModal;
