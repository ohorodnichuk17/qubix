import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../../utils/api/apiClient";
import { Card, Avatar, Button, message, Modal, Flex, ConfigProvider } from "antd";
import { APP_ENV } from "../../../env";
import { avatar } from "../../../utils/images";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { IStory } from "../Story/list/types";
import { IUser } from "./types";

const FriendsSearchPage = () => {
   const [users, setUsers] = useState<IUser[]>([]);
   const [stories, setStories] = useState<IStory[]>([]);
   const [currentStory, setCurrentStory] = useState<IStory>();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const location = useLocation();

   useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const firstName = queryParams.get("firstName");
      const lastName = queryParams.get("lastName");

      if (firstName && lastName) {
         console.log(`Searching for friends with first name: ${firstName} and last name: ${lastName}`);
         apiClient
            .post(`/api/friends/search-friends-by-first-and-last-names`, { firstName, lastName })
            .then((res) => {
               console.log("API response:", res.data);
               setUsers(res.data.$values || res.data);
            })
            .catch((error) => {
               console.error("Error fetching friends by name:", error);
            });
      } else {
         message.error("Both first name and last name are required.");
      }
   }, [location.search]);

   useEffect(() => {
      apiClient
         .get("api/story/getAll")
         .then((res) => {
            console.log("Fetched stories:", res.data);
            setStories(res.data);
         })
         .catch(() => {
            message.error("Stories fetching error");
         });
   }, []);

   const getPublicationDate = (date: string) => new Date(date).toDateString();

   const getStory = (type: "next" | "prev") => {
      if (!currentStory) return;

      let index = stories.indexOf(currentStory);
      type === "next" ? index++ : index--;

      if (index >= 0 && index < stories.length) {
         setCurrentStory(stories[index]);
      } else {
         setIsModalOpen(false);
      }
   };

   return (
      <div>
         {users.length > 0 ? (
            users.map((user) => {
               const avatarUrl = user.avatar ? `${APP_ENV.BASE_URL}/images/avatars/${user.avatar}` : avatar;

               return (
                  <Card key={user.id} style={{ maxWidth: "400px", margin: "10px auto" }}>
                     <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                           size={60}
                           src={avatarUrl}
                           onClick={() => {
                              setCurrentStory(stories[0]);
                              setIsModalOpen(true);
                           }}
                           style={{
                              border: " 3px solid #7F50FF",
                              cursor: "pointer",
                              minHeight: 60,
                              minWidth: 60,
                           }}
                        />
                        <h3 style={{ marginLeft: "10px" }}>{`${user.firstName} ${user.lastName}`}</h3>
                     </div>
                     <div style={{ marginTop: "10px", textAlign: "center" }}>
                        <Button type="primary" style={{ backgroundColor: "orange", borderColor: "orange" }}>
                           Add Friend
                        </Button>
                     </div>
                  </Card>
               );
            })
         ) : (
            <p>No friends found with the given name.</p>
         )}

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
            <Modal
               visible={isModalOpen}
               onCancel={() => setIsModalOpen(false)}
               footer={null}
               width="fit-content"
            >
               <Flex align="center" justify="center" gap="small">
                  <Button
                     icon={<ArrowLeftOutlined />}
                     onClick={() => getStory("prev")}
                  />
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
                                 <span>
                                    {getPublicationDate(currentStory?.createdAt ?? "")}
                                 </span>
                              </Flex>
                           </Flex>
                        </NavLink>
                     </Flex>
                  ) : (
                     <p>No story available</p>
                  )}
                  <Button
                     icon={<ArrowRightOutlined />}
                     onClick={() => getStory("next")}
                  />
               </Flex>
            </Modal>
         </ConfigProvider>
      </div>
   );
};

export default FriendsSearchPage;
