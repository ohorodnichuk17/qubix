import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import {
   Avatar,
   Badge,
   Button,
   Card,
   Divider,
   Dropdown,
   Flex,
   Grid,
   Row,
   Tabs,
   type TabsProps,
   message,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import type { UploadChangeParam } from "antd/es/upload";
import { useDispatch } from "react-redux";
import { APP_ENV } from "../../../env";
import { useAppSelector } from "../../../hooks/redux";
import { autoLogin } from "../../../store/account/account.slice";
import type { FileType } from "../../../types/FileType";
import { apiClient } from "../../../utils/api/apiClient";
import { getBase64 } from "../../../utils/helpers/getBase64";
import { avatar as avatarImg, bg6, lockImg } from "../../../utils/images";
import CoverPhotoBlock from "./components/CoverPhotoBlock";
import EditProfileModal from "./components/EditProfileModal";
import { AvatarButton } from "./styled";
import type { IUserProfile } from "./types";
import { useSearchParams } from "react-router-dom";
import * as styles from "./styles";
import ShortInformationCard from "./components/ShortInformationCard";
import AvatarMenu from "./menus/AvatarMenu";
import type { IStory } from "../Story/list/types";
import StoryModal from "../../storyModal/StoryModal";
import type { IPost } from "../../post/list/types";
import UserProfilePostList from "./components/UserProfilePostList";
import SendFriendRequestButton from "../../featured/SendFriendRequestButton/SendFriendRequestButton";
import AcceptFriendRequestButton from "../../featured/AcceptFriendRequestButton/AcceptFriendRequestButton";
import RemoveFriendButton from "../../featured/RemoveFriendButton/RemoveFriendButton";

const UserProfilePage: React.FC = () => {
   const { user } = useAppSelector((state) => state.account);
   const screens = Grid.useBreakpoint();
   const [coverPhoto, setCoverPhoto] = useState(bg6);
   const [avatar, setAvatar] = useState(avatarImg);
   const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
   const dispatch = useDispatch();
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [relationshipsStatus, setRelationshipsStatus] = useState<number>();
   const [posts, setPosts] = useState<IPost[]>([]);
   const [stories, setStories] = useState<IStory[]>([]);
   const [currentStory, setCurrentStory] = useState<IStory>();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [searchParams] = useSearchParams();
   const userId = searchParams.get("userId");
   const isCurrentUserProfile = userId === null || userId === user?.id;

   const isScreenSmallerThatMd =
      (screens.xs || screens.sm) &&
      !screens.md &&
      !screens.lg &&
      !screens.xl &&
      !screens.xxl;

   useEffect(() => {
      if (!user?.id && !userId) {
         return;
      }

      apiClient
         .get(
            `/api/user-profile/get-profile-by-id?UserId=${isCurrentUserProfile ? user?.id : userId}`,
         )
         .then((response) => {
            setUserProfile(response.data);

            if (response.data.coverPhoto) {
               setCoverPhoto(
                  `${APP_ENV.BASE_URL}/images/coverPhotos/${response.data.coverPhoto}`,
               );
            }

            if (response.data.userEntity.avatar) {
               setAvatar(
                  `${APP_ENV.BASE_URL}/images/avatars/${response.data.userEntity.avatar}`,
               );
            }
         })
         .catch((error) => {
            message.error("There was an error fetching the user data!");
            console.error("There was an error fetching the user data!", error);
         });

      updateRelationshipStatus();
      fetchPosts();
      fetchStories();
   }, [isCurrentUserProfile, user?.id, userId]);

   const fetchPosts = () => {
      apiClient
         .get(`/api/user-profile/getPostsBy/${userId || user?.id}`)
         .then((response) => {
            setPosts(response.data);
         })
         .catch((error) => {
            message.error("There was an error fetching posts!");
            console.error("Error fetching posts:", error);
         });
   };

   const fetchStories = () => {
      apiClient
         .get(`/api/user-profile/getStoriesBy/${userId || user?.id}`)
         .then((response) => {
            setStories(response.data);
         })
         .catch((error) => {
            message.error("There was an error fetching stories!");
            console.error("Error fetching stories:", error);
         });
   };

   const handleUploadChange = async (
      info: UploadChangeParam,
      type: "avatar" | "coverPhoto",
   ) => {
      const file = info.fileList[0];
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj as FileType);
      }
      const preview = file.url || (file.preview as string);

      if (type === "avatar") {
         setAvatar(preview);
      } else {
         setCoverPhoto(preview);
      }

      const formData = new FormData();
      if (user?.id) {
         formData.append("userId", user.id);
      }
      formData.append(type, file.originFileObj as FileType);

      apiClient
         .put("/api/user-profile/edit-profile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
         })
         .then((res) => {
            if (type === "avatar") {
               dispatch(autoLogin(res.data.token));
            }
         })
         .catch((error) => {
            console.error(error);
            message.error(`Failed to change ${type}`);
         });
   };

   const updateRelationshipStatus = () => {
      if (!isCurrentUserProfile && userId !== null) {
         apiClient
            .get(`api/friends/relationships-status?friendId=${userId}`)
            .then((res) => {
               setRelationshipsStatus(res.data);
            });
      }
   };

   const handleCoverPhotoChange = async (info: UploadChangeParam) =>
      handleUploadChange(info, "coverPhoto");

   const handleAvatarChange = async (info: UploadChangeParam) =>
      handleUploadChange(info, "avatar");

   const handleNavigateStory = (type: "next" | "prev") => {
      if (!currentStory) return;

      let index = stories.indexOf(currentStory);
      type === "next" ? index++ : index--;

      if (index >= 0 && index < stories.length) {
         setCurrentStory(stories[index]);
      } else {
         setIsModalOpen(false);
      }
   };

   const tabsItems: TabsProps["items"] = [
      {
         key: "posts",
         label: "Posts",
         children: <UserProfilePostList posts={posts} setPosts={setPosts} />,
      },
      {
         key: "information",
         label: "Information",
         children: <ShortInformationCard userProfile={userProfile} />,
      },
   ];

   return (
      <div style={{ backgroundColor: "#FFEBE0", padding: 0, height: "100%" }}>
         <Row justify="center" align="middle">
            <Card style={styles.profileCard}>
               <CoverPhotoBlock
                  coverPhoto={coverPhoto}
                  setCoverPhoto={setCoverPhoto}
                  handleCoverPhotoChange={handleCoverPhotoChange}
                  isCurrentUserProfile={isCurrentUserProfile}
               />
               <Flex
                  align="center"
                  justify="space-between"
                  wrap="wrap"
                  style={{ marginTop: "-5%" }}
               >
                  <Flex align="center" wrap="wrap" gap="middle">
                     <Avatar
                        size={isScreenSmallerThatMd ? 80 : 160}
                        src={avatar}
                        style={{
                           border:
                              stories.length > 0
                                 ? "3px solid #7F50FF"
                                 : "3px solid #ffebe0",
                           cursor: stories.length > 0 ? "pointer" : "inherit",
                        }}
                        onClick={() => {
                           if (stories.length > 0) {
                              setCurrentStory(stories[0]);
                              setIsModalOpen(true);
                           }
                        }}
                     />
                     {isCurrentUserProfile && (
                        <Dropdown
                           menu={{
                              items: AvatarMenu({
                                 avatar,
                                 handleAvatarChange,
                                 setAvatar,
                              }),
                           }}
                        >
                           <AvatarButton icon={<CameraOutlined />} />
                        </Dropdown>
                     )}
                     <p style={{ fontSize: isScreenSmallerThatMd ? 20 : 24 }}>
                        {`${userProfile?.userEntity.firstName} ${userProfile?.userEntity.lastName}`}
                     </p>
                  </Flex>
                  {isCurrentUserProfile && (
                     <>
                        <Button
                           icon={<EditOutlined />}
                           type="primary"
                           onClick={() => setIsModalVisible(true)}
                        >
                           Edit Profile
                        </Button>
                        <EditProfileModal
                           isModalVisible={isModalVisible}
                           setIsModalVisible={setIsModalVisible}
                           userProfile={userProfile}
                        />
                     </>
                  )}
                  {!isCurrentUserProfile && (
                     <>
                        {relationshipsStatus === 0 && (
                           <SendFriendRequestButton friendId={userId} afterSendRequestFn={updateRelationshipStatus} />
                        )}
                        {relationshipsStatus === 1 && (
                           <Flex vertical gap={5} align="end" style={{ marginTop: '5%' }}>
                              <Badge count={"friend"} color="orange" />
                              <RemoveFriendButton friendId={userId} afterRemoveFriendFn={updateRelationshipStatus} />
                           </Flex>
                        )}
                        {relationshipsStatus === 2 && (
                           <AcceptFriendRequestButton friendId={userId} afterAcceptRequestFn={updateRelationshipStatus} />
                        )}
                        {relationshipsStatus === 3 && (
                           <Badge count={"wait to accept"} color="orange" />
                        )}
                     </>
                  )}
               </Flex>

               {!userProfile?.isProfilePublic && !isCurrentUserProfile ? (
                  <Flex
                     style={{ width: "100%", height: "100%" }}
                     justify="center"
                     align="center"
                  >
                     <img src={lockImg} alt="Lock icon " height={60} />
                     <h1 style={{ fontSize: 40 }}>Private account</h1>
                  </Flex>
               ) : (
                  <>
                     <Divider />
                     <Flex justify="center">
                        <Tabs items={tabsItems} style={{ width: "100%" }} />
                     </Flex>
                  </>
               )}

               <StoryModal
                  currentStory={currentStory}
                  isModalOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onNavigate={handleNavigateStory}
               />
            </Card>
         </Row>
      </div>
   );
};

export default UserProfilePage;
