import { Avatar } from "antd";
import {MessageItemProps} from "../types.ts";

const MessageItem: React.FC<MessageItemProps> = ({ msg, avatar }) => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Avatar src={avatar} />
        <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "20px", maxWidth: "60%", marginLeft: "10px" }}>
            <p style={{ color: "#555", marginBottom: 0 }}>{msg.text}</p>
            <span style={{ fontSize: "12px", color: "#888" }}>{msg.time}</span>
        </div>
    </div>
);

export default MessageItem;