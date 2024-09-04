import { Modal, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux/index.ts";
import { apiClient } from "../../../utils/api/apiClient.ts";
import {
	StyledButton,
	StyledContainer,
	StyledParagraph,
	StyledTitle,
} from "../styled.ts";

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
				.delete("/api/user-profile/delete-profile", {
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
		<StyledContainer>
			<StyledTitle level={2}>Delete Account</StyledTitle>
			<StyledParagraph>
				Deleting your account will remove all your data permanently. This action
				cannot be undone. Are you sure you want to proceed?
			</StyledParagraph>
			<StyledButton onClick={showModal}>Delete Account</StyledButton>
			<Modal
				title="Confirm Account Deletion"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Yes, delete my account"
				cancelText="Cancel"
			>
				<StyledParagraph>
					Are you sure you want to delete your account? This action cannot be
					undone.
				</StyledParagraph>
			</Modal>
		</StyledContainer>
	);
};

export default DeleteProfilePage;
