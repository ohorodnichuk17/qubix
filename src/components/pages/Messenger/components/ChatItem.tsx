import { List, Avatar } from "antd";
import {ChatItemProps} from "../types.ts";


const ChatItem: React.FC<ChatItemProps> = ({ item, handleChatClick, handleAvatarClick }) => (
    <List.Item onClick={() => handleChatClick(item)}>
        <List.Item.Meta
            avatar={<Avatar src={item.avatar} onClick={() => handleAvatarClick(item.profile)} style={{ cursor: "pointer" }} />}
            title={item.name}
            description={
                <>
                    <div>{item.messages[item.messages.length - 1].text}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{item.messages[item.messages.length - 1].time}</div>
                </>
            }
        />
    </List.Item>
);

export default ChatItem;