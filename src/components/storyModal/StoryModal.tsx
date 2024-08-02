import React from "react";
import { Avatar, Button, ConfigProvider, Flex, Modal } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { avatar } from "../../utils/images";
import { APP_ENV } from "../../env";
import { IStory } from "../pages/Story/list/types";

interface StoryModalProps {
   currentStory?: IStory;
   isModalOpen: boolean;
   onClose: () => void;
   onNavigate: (type: "next" | "prev") => void;
}

const StoryModal: React.FC<StoryModalProps> = ({
   currentStory,
   isModalOpen,
   onClose,
   onNavigate,
}) => {
   const getPublicationDate = (date: string) => new Date(date).toDateString();

   return (
      <ConfigProvider
         theme={{
            components: {
               Modal: {
                  headerBg: "transperent",
                  contentBg: "transperent",
                  footerBg: "transperent",
               },
            },
         }}
      >
         <Modal visible={isModalOpen} onCancel={onClose} footer={null} width="fit-content">
            <Flex align="center" justify="center" gap="small">
               <Button icon={<ArrowLeftOutlined />} onClick={() => onNavigate("prev")} />
               {currentStory ? (
                  <Flex
                     justify="center"
                     style={{
                        height: "60vh",
                        background: `url(${APP_ENV.BASE_URL}/images/stories/${currentStory.image}) center no-repeat`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                     }}
                  >
                     <NavLink
                        to={`profile?userId=${currentStory?.user.id}`}
                        style={{
                           color: "black",
                           height: "fit-content",
                           padding: 5,
                           background: "rgba(255,255,255,0.5)",
                           borderRadius: 15,
                        }}
                     >
                        <Flex>
                           <Avatar
                              size={60}
                              src={
                                 currentStory?.user.avatar === null
                                    ? avatar
                                    : `${APP_ENV.BASE_URL}/images/avatars/${currentStory?.user.avatar}`
                              }
                           />
                           <Flex vertical>
                              <span style={{ fontWeight: 600, fontSize: 20 }}>
                                 {`${currentStory?.user.firstName} ${currentStory?.user.lastName}`}
                              </span>
                              <span>{getPublicationDate(currentStory?.createdAt ?? "")}</span>
                           </Flex>
                        </Flex>
                     </NavLink>
                  </Flex>
               ) : (
                  <p>No story available</p>
               )}
               <Button icon={<ArrowRightOutlined />} onClick={() => onNavigate("next")} />
            </Flex>
         </Modal>
      </ConfigProvider>
   );
};

export default StoryModal;
