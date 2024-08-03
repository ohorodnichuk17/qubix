import { useState } from "react";
import {
   Layout,
   Button,
   List,
   Typography,
   Drawer,
   Avatar,
   Grid,
   Input,
} from "antd";
import {
   EditOutlined,
   PlusOutlined,
   SendOutlined,
} from "@ant-design/icons";
import { avatar } from "../../../utils/images";
import "./MessengerPage.css";

const { Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const initialMessages = [
   {
      name: "Lili_NK",
      messages: [
         {
            text: "Hi, can you please help me with the project?",
            time: "15 хв.",
         },
      ],
      avatar: <img src={avatar} alt="Avatar" style={{ height: "40px" }} />,
      profile: "Profile information for Lili_NK",
   },
   {
      name: "Den_V",
      messages: [
         {
            text: "Thank you! Your assistance was really helpful.",
            time: "40 хв.",
         },
      ],
      avatar: <img src={avatar} alt="Avatar" style={{ height: "40px" }} />,
      profile: "Profile information for Den_V",
   },
];

function MessengerPage() {
   const [messages, setMessages] = useState(initialMessages);
   const [isDrawerVisible, setIsDrawerVisible] = useState(false);
   const [selectedChat, setSelectedChat] = useState<typeof initialMessages[0] | null>(null);
   const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
   const [newMessage, setNewMessage] = useState("");

   const screens = useBreakpoint();

   const showModal = () => {
      console.log("Modal shown");
   };

   const closeDrawer = () => {
      setIsDrawerVisible(false);
   };

   const handleChatClick = (chat: typeof initialMessages[0]) => {
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
                  messages: [
                     ...chat.messages,
                     {
                        text: newMessage,
                        time: "Just now",
                     },
                  ],
               };
            }
            return chat;
         });

         setMessages(updatedMessages);

         if (selectedChat) {
            setSelectedChat({
               ...selectedChat,
               messages: [
                  ...selectedChat.messages,
                  {
                     text: newMessage,
                     time: "Just now",
                  },
               ],
            });
         }

         setNewMessage("");
      }
   };

   return (
      <Layout style={{ minHeight: "100vh" }}>
         <Sider
            width={300}
            breakpoint="lg"
            collapsedWidth="0"
            style={{
               backgroundColor: "#f9f9f9",
               padding: "16px",
               borderRight: "1px solid #e6e6e6",
            }}
         >
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
               <EditOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
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
               onClick={showModal}
            >
               Requests
            </Button>
            <List
               itemLayout="horizontal"
               dataSource={messages}
               style={{ cursor: "pointer" }}
               renderItem={(item) => (
                  <List.Item onClick={() => handleChatClick(item)}>
                     <List.Item.Meta
                        avatar={
                           <Avatar
                              src={item.avatar}
                              onClick={() => handleAvatarClick(item.profile)}
                              style={{ cursor: "pointer" }}
                           />
                        }
                        title={item.name}
                        description={
                           <>
                              <div>{item.messages[item.messages.length - 1].text}</div>
                              <div style={{ fontSize: "12px", color: "#888" }}>
                                 {item.messages[item.messages.length - 1].time}
                              </div>
                           </>
                        }
                     />
                  </List.Item>
               )}
            />
         </Sider>

         <Drawer
            title="Messages"
            placement="left"
            closable={false}
            onClose={closeDrawer}
            visible={!screens.lg && isDrawerVisible}
            className="drawer"
            width={300}
            bodyStyle={{
               padding: "0px 16px",
            }}
         >
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
               <EditOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
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
               onClick={showModal}
            >
               Requests
            </Button>
            <List
               itemLayout="horizontal"
               dataSource={messages}
               renderItem={(item) => (
                  <List.Item onClick={() => handleChatClick(item)}>
                     <List.Item.Meta
                        avatar={
                           <Avatar
                              src={item.avatar}
                              onClick={() => handleAvatarClick(item.profile)}
                           />
                        }
                        title={item.name}
                        description={
                           <>
                              <div>{item.messages[item.messages.length - 1].text}</div>
                              <div style={{ fontSize: "12px", color: "#888" }}>
                                 {item.messages[item.messages.length - 1].time}
                              </div>
                           </>
                        }
                     />
                  </List.Item>
               )}
            />
         </Drawer>

         <Layout>
            <Content
               style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  background: "#F5EBE0",
                  padding: screens.lg ? "24px" : "16px",
                  textAlign: "left",
                  width: "100%",
               }}
            >
               {selectedChat ? (
                  <>
                     <div style={{ display: "flex", alignItems: "center", borderRadius: "10px", gap: "20px", background: "rgb(249, 249, 249)", width: "100%", padding: "10px", marginBottom: "10px" }}>
                        <Avatar src={avatar} style={{ height: "60px", width: "60px" }} />
                        <Title level={4} style={{ marginBottom: "16px" }}>
                           {selectedChat.name}
                        </Title>
                     </div>
                     <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                        {selectedChat.messages.map((msg, index) => (
                           <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }} key={index}>
                              <Avatar src={selectedChat.avatar} />
                              <div
                                 style={{
                                    backgroundColor: "#f0f0f0",
                                    padding: "10px",
                                    borderRadius: "20px",
                                    maxWidth: "60%",
                                    marginLeft: "10px",
                                 }}
                              >
                                 <p style={{ color: "#555", marginBottom: 0 }}>{msg.text}</p>
                                 <span style={{ fontSize: "12px", color: "#888" }}>{msg.time}</span>
                              </div>
                           </div>
                        ))}
                        <div style={{ display: "flex", width: "100%", marginTop: "auto" }}>
                           <Input
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              style={{ flex: 1, marginRight: "10px" }}
                           />
                           <Button
                              type="primary"
                              icon={<SendOutlined />}
                              onClick={handleSendMessage}
                              style={{
                                 backgroundColor: "#ff6f3c",
                                 borderColor: "#ff6f3c",
                              }}
                           />
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <div
                        style={{
                           fontSize: "48px",
                           color: "#8c8c8c",
                           marginBottom: "16px",
                           textAlign: "center",
                           width: "100%",
                        }}
                     >
                        <svg
                           width="1em"
                           height="1em"
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                           style={{ verticalAlign: "middle" }}
                        >
                           <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.48 2 2 6.48 2 12C2 13.97 2.72 15.75 3.91 17.12L2 22L7.08 20.09C8.45 21.28 10.24 22 12.2 22C17.72 22 22.2 17.52 22.2 12C22.2 6.48 17.72 2 12 2ZM10.2 15H8.2V13H10.2V15ZM14.2 15H12.2V13H14.2V15ZM16.2 15H18.2V13H16.2V15Z"
                              fill="#8c8c8c"
                           />
                        </svg>
                     </div>
                     <Title level={4} style={{ color: "#8c8c8c", textAlign: "center", width: "100%" }}>
                        Your messages
                     </Title>
                     <p style={{ color: "#8c8c8c", textAlign: "center", width: "100%" }}>
                        Select a chat to view messages
                     </p>
                  </>
               )}
            </Content>
         </Layout>

         <Sider
            width={300}
            breakpoint="lg"
            collapsedWidth="0"
            style={{
               backgroundColor: "#f9f9f9",
               padding: "16px",
               textAlign: "center",
               borderLeft: "1px solid #e6e6e6",
            }}
         >
            {selectedChat && (
               <div>
                  <Avatar src={avatar} style={{ height: "100px", width: "100px" }} />
                  <Title level={4}>{selectedChat.name}</Title>
               </div>
            )}
            {selectedProfile && (
               <div>
                  <Title level={4}>Profile Information</Title>
                  <p>{selectedProfile}</p>
               </div>
            )}
         </Sider>
      </Layout>
   );
}

export default MessengerPage;
