import { useState } from "react";
import { Layout, Drawer, Grid, Typography } from "antd";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import ProfileInfo from "./components/ProfileInfo";
import { avatar } from "../../../utils/images";
import "./MessengerPage.css";
import {ChatItemData} from "./types.ts";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const initialMessages: ChatItemData[] = [
    {
        name: "Lili_NK",
        messages: [{ text: "Hi, can you please help me with the project?", time: "15 хв." }],
        avatar: avatar,
        profile: "Profile information for Lili_NK",
    },
    {
        name: "Den_V",
        messages: [{ text: "Thank you! Your assistance was really helpful.", time: "40 хв." }],
        avatar: avatar,
        profile: "Profile information for Den_V",
    },
];

function MessengerPage() {
    const [messages, setMessages] = useState<ChatItemData[]>(initialMessages);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [selectedChat, setSelectedChat] = useState<ChatItemData | null>(null);
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const screens = useBreakpoint();

    const showModal = () => {
        console.log("Modal shown");
    };

    const closeDrawer = () => {
        setIsDrawerVisible(false);
    };

    const handleChatClick = (chat: ChatItemData) => {
        setSelectedChat(chat);
        setSelectedProfile(null);
    };

    const handleAvatarClick = (profile: string) => {
        setSelectedProfile(profile);
        setSelectedChat(null);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const updatedMessages = messages.map((chat) => {
                if (chat === selectedChat) {
                    return {
                        ...chat,
                        messages: [...chat.messages, { text: newMessage, time: "Just now" }],
                    };
                }
                return chat;
            });

            setMessages(updatedMessages);

            if (selectedChat) {
                setSelectedChat({
                    ...selectedChat,
                    messages: [...selectedChat.messages, { text: newMessage, time: "Just now" }],
                });
            }

            setNewMessage("");
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width={300} breakpoint="lg" collapsedWidth="0" style={{ backgroundColor: "#f9f9f9", padding: "16px", borderRight: "1px solid #e6e6e6" }}>
                <ChatList messages={messages} handleChatClick={handleChatClick} handleAvatarClick={handleAvatarClick} showModal={showModal} />
            </Sider>

            <Drawer title="Messages" placement="left" closable={false} onClose={closeDrawer} visible={!screens.lg && isDrawerVisible} className="drawer" width={300} bodyStyle={{ padding: "0px 16px" }}>
                <ChatList messages={messages} handleChatClick={handleChatClick} handleAvatarClick={handleAvatarClick} showModal={showModal} />
            </Drawer>

            <Layout>
                <Content style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", background: "#F5EBE0", padding: screens.lg ? "24px" : "16px", textAlign: "left", width: "100%" }}>
                    {selectedChat ? (
                        <ChatWindow selectedChat={selectedChat} newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />
                    ) : (
                        <>
                            <div style={{ fontSize: "48px", color: "#8c8c8c", marginBottom: "16px", textAlign: "center", width: "100%" }}>
                                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 13.97 2.72 15.75 3.91 17.12L2 22L7.08 20.09C8.45 21.28 10.24 22 12.2 22C17.72 22 22.2 17.52 22.2 12C22.2 6.48 17.72 2 12 2ZM10.2 15H8.2V13H10.2V15ZM14.2 15H12.2V13H14.2V15ZM16.2 15H18.2V13H16.2V15Z" fill="#8c8c8c" />
                                </svg>
                            </div>
                            <Title level={4} style={{ color: "#8c8c8c", textAlign: "center", width: "100%" }}>Your messages</Title>
                            <p style={{ color: "#8c8c8c", textAlign: "center", width: "100%" }}>Select a chat to view messages</p>
                        </>
                    )}
                </Content>
            </Layout>

            <Sider width={300} breakpoint="lg" collapsedWidth="0" style={{ backgroundColor: "#f9f9f9", padding: "16px", textAlign: "center", borderLeft: "1px solid #e6e6e6" }}>
                <ProfileInfo selectedChat={selectedChat ?? undefined} selectedProfile={selectedProfile ?? undefined} />
            </Sider>
        </Layout>
    );
}

export default MessengerPage;