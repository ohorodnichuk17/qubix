import { Modal, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/index.ts";
import { apiClient } from "../../../utils/api/apiClient.ts";
import {
	StyledButton,
	StyledContainer,
	StyledParagraph,
	StyledTitle,
} from "../styled.ts";
import { userLogout } from "../../../store/account/account.actions.ts";

const DeleteProfilePage = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.account);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const navigate = useNavigate();

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = async () => {
		if (!user?.id) return;
		try {
			await apiClient.delete("/api/user-profile/delete-profile", {
				data: { Id: user.id },
			})
			message.success("Account deleted successfully!");
			await dispatch(userLogout());
			navigate("/account-deleted-successfully");
		} catch (error) {
			message.error("Failed to delete account");
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
