import { Avatar } from "antd";
import { useAppSelector } from "../../../../hooks/redux";
import type { IMessage } from "../types";

export interface MessageItemProps {
	message: IMessage;
	avatar: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, avatar }) => {
	const { user } = useAppSelector((state) => state.account);
	const isCurrentUserMessage = user?.id === message.userId;
	return (
		<div
			style={{
				display: "flex",
				flexDirection: isCurrentUserMessage ? "row-reverse" : "row",
				alignItems: "center",
				marginBottom: "16px",
				gap: 10,
			}}
		>
			<Avatar src={avatar} />
			<div
				style={{
					backgroundColor: "#f0f0f0",
					padding: "10px",
					borderRadius: "20px",
					maxWidth: "60%",
				}}
			>
				<p style={{ color: "#555", marginBottom: 0, wordBreak: "break-word" }}>
					{message.content}
				</p>
				<span style={{ fontSize: "12px", color: "#888" }}>
					{new Date(message.createdAt).toLocaleTimeString()}
				</span>
			</div>
		</div>
	);
};

export default MessageItem;
