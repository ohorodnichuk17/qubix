import { useState } from "react";
import {
   Layout,
   Button,
   List,
   Typography,
   Modal,
   Input,
   Drawer,
} from "antd";
import {
   MenuOutlined,
   EditOutlined,
   PlusOutlined,
} from "@ant-design/icons";
import { avatar } from "../../../utils/images";

const { Sider, Content } = Layout;
const { Title } = Typography;

const messages = [
   {
      name: "Lili_NK",
      message: "Hi, can you please...",
      time: "15 хв.",
      avatar: <img src={avatar} alt="Avatar" style={{ height: "40px" }} />,
   },
   {
      name: "Den_V",
      message: "Thank you!",
      time: "40 хв.",
      avatar: <img src={avatar} alt="Avatar" style={{ height: "40px" }} />,
   },
];

function MessengerPage() {
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isDrawerVisible, setIsDrawerVisible] = useState(false);

   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   const showDrawer = () => {
      setIsDrawerVisible(true);
   };

   const closeDrawer = () => {
      setIsDrawerVisible(false);
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
            onBreakpoint={(broken) => {
               if (broken) {
                  setIsDrawerVisible(false);
               }
            }}
            className="sidebar"
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
               Запити
            </Button>
            <List
               itemLayout="horizontal"
               dataSource={messages}
               renderItem={(item) => (
                  <List.Item>
                     <List.Item.Meta
                        avatar={item.avatar}
                        title={item.name}
                        description={
                           <>
                              <div>{item.message}</div>
                              <div style={{ fontSize: "12px", color: "#888" }}>
                                 {item.time}
                              </div>
                           </>
                        }
                     />
                  </List.Item>
               )}
            />
         </Sider>

         <Drawer
            title="Повідомлення"
            placement="left"
            closable={false}
            onClose={closeDrawer}
            visible={isDrawerVisible}
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
                  Повідомлення
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
               Запити
            </Button>
            <List
               itemLayout="horizontal"
               dataSource={messages}
               renderItem={(item) => (
                  <List.Item>
                     <List.Item.Meta
                        avatar={item.avatar}
                        title={item.name}
                        description={
                           <>
                              <div>{item.message}</div>
                              <div style={{ fontSize: "12px", color: "#888" }}>
                                 {item.time}
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
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  padding: "24px",
                  textAlign: "center",
               }}
            >
               <Button
                  type="primary"
                  icon={<MenuOutlined />}
                  onClick={showDrawer}
                  style={{
                     display: "none",
                     marginBottom: "16px",
                     backgroundColor: "#ff6f3c",
                     borderColor: "#ff6f3c",
                  }}
                  className="menuButton"
               >
                  Меню
               </Button>

               <div
                  style={{
                     fontSize: "48px",
                     color: "#8c8c8c",
                     marginBottom: "16px",
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
               <Title level={4} style={{ color: "#8c8c8c" }}>
                  Your messages
               </Title>
               <p style={{ color: "#8c8c8c" }}>
                  Send photos and messages to a friend
               </p>
               <Button
                  type="primary"
                  style={{
                     backgroundColor: "#ff6f3c",
                     borderColor: "#ff6f3c",
                  }}
                  onClick={showModal}
               >
                  Send a message
               </Button>
            </Content>
         </Layout>

         <Modal
            title="New message"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
               <Button key="cancel" onClick={handleCancel}>
                  Закрити
               </Button>,
               <Button
                  key="send"
                  type="primary"
                  style={{ backgroundColor: "#ff6f3c", borderColor: "#ff6f3c" }}
                  disabled
               >
                  Чат
               </Button>,
            ]}
         >
            <Input placeholder="Кому..." />
            <p style={{ color: "#888", marginTop: "10px" }}>
               Account was not found.
            </p>
         </Modal>
      </Layout>
   );
}

export default MessengerPage;