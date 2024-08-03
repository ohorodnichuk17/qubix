import { Avatar, Button, Input, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";
import MessageItem from "./MessageItem.tsx";
import {ChatWindowProps, Message} from "../types.ts";

const { Title } = Typography;

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat, newMessage, setNewMessage, handleSendMessage }) => (
    <>
        <div style={{ display: "flex", alignItems: "center", borderRadius: "10px", gap: "20px", background: "rgb(249, 249, 249)", width: "100%", padding: "10px", marginBottom: "10px" }}>
            <Avatar src={selectedChat.avatar} style={{ height: "60px", width: "60px" }} />
            <Title level={4} style={{ marginBottom: "16px" }}>{selectedChat.name}</Title>
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            {selectedChat.messages.map((msg: Message, index: number) => (
                <MessageItem key={index} msg={msg} avatar={selectedChat.avatar} />
            ))}
            <div style={{ display: "flex", width: "100%", marginTop: "auto" }}>
                <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={{ flex: 1, marginRight: "10px" }} />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                    style={{ backgroundColor: "#ff6f3c", borderColor: "#ff6f3c" }}
                />
            </div>
        </div>
    </>
);

export default ChatWindow;