import { List, Button, Typography } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import ChatItem from "./ChatItem";
import {ChatListProps} from "../types.ts";

const { Title } = Typography;

const ChatList: React.FC<ChatListProps> = ({ messages, handleChatClick, handleAvatarClick, showModal }) => (
    <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <Title level={4} style={{ margin: 0 }}>Messages</Title>
            <EditOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
        </div>
        <Button
            type="primary"
            icon={<PlusOutlined />}
            block
            style={{ backgroundColor: "#ff6f3c", borderColor: "#ff6f3c", marginBottom: "20px" }}
            onClick={showModal}
        >
            Requests
        </Button>
        <List
            itemLayout="horizontal"
            dataSource={messages}
            style={{ cursor: "pointer" }}
            renderItem={(item) => (
                <ChatItem item={item} handleChatClick={handleChatClick} handleAvatarClick={handleAvatarClick} />
            )}
        />
    </>
);

export default ChatList;