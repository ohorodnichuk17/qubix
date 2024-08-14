import { Grid, Layout, message } from "antd";
import { useEffect, useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import ProfileInfo from "./components/ProfileInfo";
import "./MessengerPage.css";
import {
	type HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from "@microsoft/signalr";
import { APP_ENV } from "../../../env/index.ts";
import { useAppSelector } from "../../../hooks/redux/index.ts";
import { apiClient } from "../../../utils/api/apiClient.ts";
import { avatar } from "../../../utils/images/index.tsx";
import WelcomeToChat from "./components/WelcomeToChat.tsx";
import type { IChat, ISendMessage } from "./types.ts";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

function MessengerPage() {
	const { user } = useAppSelector((state) => state.account);
	const [chats, setChats] = useState<IChat[]>([]);
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
	const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
	const screens = useBreakpoint();
	const [connection, setConnection] = useState<HubConnection | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const initializeChat = async () => {
			const connection = new HubConnectionBuilder()
				.withUrl(`${APP_ENV.BASE_URL}/chathub`)
				.configureLogging(LogLevel.Information)
				.build();

			connection.on(
				"ReceiveMessage",
				(fromUserEmail, messageContent, chatId) => {
					console.log(chatId);
					if (fromUserEmail !== user?.email)
						message.info(
							`New message from ${fromUserEmail}: ${messageContent}`,
						);
					loadMessages(chatId);
				},
			);

			try {
				await connection.start();
				console.log("SignalR Connected.");
				setConnection(connection);
			} catch (err) {
				console.error("SignalR Connection Error: ", err);
			}
		};

		initializeChat();

		loadChats();

		return () => {
			if (connection) {
				connection.stop();
			}
		};
	}, []);

	const loadChats = () => {
		apiClient.get<IChat[]>(`api/chat/${user?.id}`).then((res) => {
			const newchats = res.data;
			for (const chat of newchats) {
				for (const chatUser of chat.chatUsers) {
					chatUser.user.avatar =
						chatUser.user.avatar === null
							? avatar
							: `${APP_ENV.BASE_URL}/images/avatars/${chatUser.user.avatar}`;
					if (chatUser.user.id !== user?.id) {
						chat.user = chatUser.user;
					}
				}
			}
			setChats(newchats);
		});
	};

	const loadMessages = async (chatId?: string) => {
		if (!selectedChat && !chatId) return;

		try {
			const response = await apiClient.get(
				`/api/message/${chatId ?? selectedChat?.id}`,
			);
			if (!selectedChat) return;

			const updatedChat = { ...selectedChat, messages: response.data };
			setSelectedChat(updatedChat);

			const updatedChats = chats.map((chat) =>
				chat.id === updatedChat.id ? updatedChat : chat,
			);
			setChats(updatedChats);
		} catch (err) {
			console.error("Get Messages Error: ", err);
			message.error("Failed to load messages.");
		}
	};

	const handleSendMessage = async (values: ISendMessage) => {
		try {
			await connection?.invoke(
				"SendMessage",
				values.fromUserEmail,
				values.toUserEmail,
				values.messageContent,
			);

			loadMessages();
		} catch (err) {
			console.error("Send Message Error: ", err);
			message.error("Failed to send message.");
		}
	};

	const handleChatClick = (chat: IChat) => {
		setSelectedChat(chat);
		if (isScreenSmallerThatMd) setIsCollapsed(true);
	};

	const isScreenSmallerThatMd =
		(screens.xs || screens.sm) &&
		!screens.md &&
		!screens.lg &&
		!screens.xl &&
		!screens.xxl;

	return (
		<Layout style={{ height: "100%" }}>
			<Sider
				width={350}
				breakpoint="lg"
				collapsedWidth="0"
				collapsed={isCollapsed}
				onCollapse={() => setIsCollapsed(!isCollapsed)}
				theme="light"
				style={{
					backgroundColor: "#f9f9f9",
					padding: isCollapsed ? 0 : 16,
					borderRight: "1px solid #e6e6e6",
					height: "100%",
				}}
			>
				<ChatList
					chats={chats}
					selectedChat={selectedChat}
					handleChatClick={handleChatClick}
					loadChats={loadChats}
				/>
			</Sider>

			<Layout>
				<Content
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: selectedChat ? "space-between" : "inherit",
						background: "#F5EBE0",
						padding: screens.lg ? "24px" : "16px",
						textAlign: "left",
						width: "100%",
					}}
				>
					{selectedChat ? (
						<ChatWindow
							chat={selectedChat}
							handleSendMessage={handleSendMessage}
						/>
					) : (
						<WelcomeToChat />
					)}
				</Content>
			</Layout>

			<Sider
				width={300}
				breakpoint="xl"
				collapsedWidth="0"
				style={{
					backgroundColor: "#f9f9f9",
					padding: "16px",
					textAlign: "center",
					borderLeft: "1px solid #e6e6e6",
				}}
			>
				<ProfileInfo
					selectedChat={selectedChat ?? undefined}
					selectedProfile={undefined}
				/>
			</Sider>
		</Layout>
	);
}

export default MessengerPage;
