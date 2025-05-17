import { Avatar, List } from "antd";
import type { IChat } from "../types";

export interface ChatItemProps {
	chat: IChat;
	isSelected: boolean;
	handleChatClick: (item: IChat) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
	chat,
	isSelected,
	handleChatClick,
}) => (
	<List.Item
		onClick={() => handleChatClick(chat)}
		className={isSelected ? "selected" : ""}
	>
		<List.Item.Meta
			avatar={<Avatar src={chat.user.avatar} style={{ cursor: "pointer" }} />}
			title={chat.user.email}
			description={
				chat.messages.length > 0 && (
					<>
						<div style={{ wordBreak: "break-word" }}>
							{chat.messages[chat.messages?.length - 1].content}
						</div>
						<div style={{ fontSize: "12px", color: "#888" }}>
							{new Date(
								chat.messages[chat.messages?.length - 1].createdAt,
							).toLocaleDateString()}
						</div>
					</>
				)
			}
		/>
	</List.Item>
);

export default ChatItem;
