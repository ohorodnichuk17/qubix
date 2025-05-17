import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, List, Typography } from "antd";
import { useState } from "react";
import type { IChat } from "../types";
import AddNewChatModal from "./AddNewChatModal";
import ChatItem from "./ChatItem";

const { Title } = Typography;

export interface ChatListProps {
	chats: IChat[];
	selectedChat: IChat | null;
	handleChatClick: (item: IChat) => void;
	loadChats: () => void;
}

const ChatList: React.FC<ChatListProps> = ({
	chats,
	selectedChat,
	handleChatClick,
	loadChats,
}) => {
	const [addNewChatModalOpen, setAddNewChatModalOpen] =
		useState<boolean>(false);
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "20px",
				}}
			>
				<Title level={4} style={{ margin: 0 }}>
					Messages
				</Title>
				<EditOutlined
					style={{ fontSize: "18px", color: "#1890ff" }}
					onClick={() => setAddNewChatModalOpen(true)}
				/>
			</div>
			<Button
				type="primary"
				icon={<PlusOutlined />}
				block
				style={{
					backgroundColor: "#ff6f3c",
					borderColor: "#ff6f3c",
					marginBottom: "20px",
				}}
			>
				Requests
			</Button>
			<Flex
				vertical
				style={{ overflowY: "auto", overflowX: "hidden", height: "100%" }}
			>
				<List
					itemLayout="horizontal"
					dataSource={chats}
					style={{ cursor: "pointer" }}
					renderItem={(item) => (
						<ChatItem
							chat={item}
							isSelected={item === selectedChat}
							handleChatClick={handleChatClick}
						/>
					)}
				/>
			</Flex>
			<AddNewChatModal
				open={addNewChatModalOpen}
				setOpen={setAddNewChatModalOpen}
				loadChats={loadChats}
			/>
		</>
	);
};

export default ChatList;
