import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Form, Input, Typography } from "antd";
import FormItem from "antd/es/form/FormItem/index";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../hooks/redux/index.ts";
import type { IChat, IMessage, ISendMessage } from "../types.ts";
import MessageItem from "./MessageItem.tsx";

const { Title } = Typography;

export interface ChatWindowProps {
	chat: IChat;
	handleSendMessage: (values: ISendMessage) => Promise<void>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, handleSendMessage }) => {
	const { user } = useAppSelector((state) => state.account);
	const [form] = Form.useForm();
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView();
	}, [chat.messages]);

	const onFinish = (values: ISendMessage) => {
		form.resetFields();
		handleSendMessage(values);
	};
	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					borderRadius: "10px",
					gap: "20px",
					background: "rgb(249, 249, 249)",
					width: "100%",
					padding: "10px",
					marginBottom: "10px",
					maxHeight: "100%",
				}}
			>
				<Avatar
					src={chat.user.avatar}
					style={{ height: "60px", width: "60px" }}
				/>
				<Title level={4} style={{ marginBottom: "16px" }}>
					{chat.user.email}
				</Title>
			</div>
			<Flex
				vertical
				justify="space-betweeen"
				style={{ width: "100%", maxHeight: "100%" }}
			>
				<Flex vertical style={{ maxHeight: "80%", overflowY: "auto" }}>
					{chat.messages.map((message: IMessage) => (
						<MessageItem
							key={message.id}
							message={message}
							avatar={
								chat.chatUsers.find((u) => u.user.id === message.userId)?.user
									.avatar ?? ""
							}
						/>
					))}
					<div ref={messagesEndRef} />
				</Flex>
				<Form onFinish={onFinish} form={form}>
					<FormItem hidden name="fromUserEmail" initialValue={user?.email} />
					<FormItem hidden name="toUserEmail" initialValue={chat.user.email} />
					<div style={{ display: "flex", width: "100%", marginTop: "auto" }}>
						<FormItem
							name="messageContent"
							style={{ width: "100%" }}
							rules={[{ required: true, message: "" }]}
						>
							<Input style={{ flex: 1, marginRight: "10px" }} />
						</FormItem>
						<Button
							htmlType="submit"
							type="primary"
							icon={<SendOutlined />}
							style={{ backgroundColor: "#ff6f3c", borderColor: "#ff6f3c" }}
						/>
					</div>
				</Form>
			</Flex>
		</>
	);
};

export default ChatWindow;
