import { Avatar, Typography } from "antd";
import type { IChat } from "../types";

const { Title } = Typography;

export interface ProfileInfoProps {
	selectedChat?: IChat;
	selectedProfile?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
	selectedChat,
	selectedProfile,
}) => (
	<>
		{selectedChat && (
			<div>
				<Avatar
					src={selectedChat.user.avatar}
					style={{ height: "100px", width: "100px" }}
				/>
				<Title level={4}>{selectedChat.user.email}</Title>
			</div>
		)}
		{selectedProfile && (
			<div>
				<Title level={4}>Profile Information</Title>
				<p>{selectedProfile}</p>
			</div>
		)}
	</>
);

export default ProfileInfo;
