import { Radio, type RadioChangeEvent, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { apiClient } from "../../../utils/api/apiClient";
import { StyledCard, StyledRadio } from "../theme";

const { Title, Paragraph } = Typography;

const PrivacyPage = () => {
	const { user } = useAppSelector((state) => state.account);

	const [isProfilePublic, setIsProfilePublic] = useState(false);

	useEffect(() => {
		apiClient
			.get(`/api/user-profile/get-profile-by-id?UserId=${user?.id}`)
			.then((res) => {
				setIsProfilePublic(res.data.isProfilePublic);
			})
			.catch(() => {
				message.error("Privacy fetching error!");
			});
	}, [user]);

	const handleRadioChange = (e: RadioChangeEvent) => {
		const isPublic = e.target.value === "public";
		setIsProfilePublic(isPublic);

		const formData = new FormData();

		if (user?.id) {
			formData.append("userId", user.id);
		}

		formData.append("IsProfilePublic", isPublic.toString());

		apiClient
			.put("/api/user-profile/edit-profile", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then(() => {
				message.success("Privacy successfully changed!");
			})
			.catch(() => {
				message.error("Failed to change privacy");
			});
	};

	return (
		<StyledCard>
			<Title level={2}>Privacy Settings</Title>
			<Paragraph>
				Choose your account visibility by selecting one of the options below. A
				private account restricts visibility to only approved followers, while a
				public account allows anyone to see all in your account.
			</Paragraph>
			<Radio.Group
				value={isProfilePublic ? "public" : "private"}
				onChange={handleRadioChange}
			>
				<StyledRadio value="private">Private Account</StyledRadio>
				<StyledRadio value="public">Public Account</StyledRadio>
			</Radio.Group>
		</StyledCard>
	);
};

export default PrivacyPage;
