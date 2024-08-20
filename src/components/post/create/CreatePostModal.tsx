import {
   Avatar,
   Divider,
   Flex,
   Form,
   Input,
   Modal,
   type RadioChangeEvent,
   message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import type { UploadFile, UploadProps } from "antd/es/upload";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import type { FileType } from "../../../types/FileType";
import { apiClient } from "../../../utils/api/apiClient";
import { getBase64 } from "../../../utils/helpers/getBase64";
import { feeling as feelingPng, postTypeImg } from "../../../utils/images";
import FeelingModal from "../../feelings/FeelingModal";
import type { IAction, IFeeling, ISubAction } from "../../feelings/types";
import BackgroundOptions from "../../pages/Story/CreateStoryPage/components/BackgroundOptions";
import useCapture from "../../pages/Story/CreateStoryPage/hooks/useCapture";
import AddToThePublicationButton from "./components/AddToThePublicationButton/AddToThePublicationButton";
import AddToThePublicationCard from "./components/AddToThePublicationCard/AddToThePublicationCard";
import ImagesCarousel from "./components/ImagesCarousel/ImagesCarousel";
import PostVisibilityModal from "./components/PostVisibilityModal/PostVisibilityModal";
import TagInput from "./components/Tags/TagInput";
import TagsList from "./components/Tags/TagsList";
import type { PostVisibility, ICreatePost, PostType } from "./types";
import useAvatar from "../../../hooks/useAvatar";
import VisibilityButton from "./components/VisibilityButton/VisibilityButton";
import type { IUser } from "../../../interfaces/account";

type CreatePostModalProps = {
   isModalOpen: boolean;
   handleOk: () => void;
   handleCancel: () => void;
};

const CreatePostModal = ({
   isModalOpen,
   handleCancel,
}: CreatePostModalProps) => {
   const { user } = useAppSelector((state) => state.account);

   const [postType, setPostType] = useState<PostType>("image");

   const [background, setBackground] = useState<string>("gray");
   const { captureAreaRef, getCapture } = useCapture();

   const [images, setImages] = useState<UploadFile[]>([]);
   const [tags, setTags] = useState<string[]>([]);
   const [feeling, setFeeling] = useState<IFeeling>();
   const [action, setAction] = useState<IAction>();
   const [subAction, setSubAction] = useState<ISubAction>();
   const [postVisibility, setPostVisibility] =
      useState<PostVisibility>("public");
   const [friendsExceptList, setFriendsExceptList] = useState<IUser[]>([]);

   const [locationInputVisibility, setLocationInputVisibility] =
      useState<boolean>(false);
   const [tagsInputVisibility, setTagsInputVisibility] =
      useState<boolean>(false);
   const [feelingModalVisible, setFeelingModalVisible] =
      useState<boolean>(false);
   const [visibilityModalVisible, setVisibilityModalVisible] =
      useState<boolean>(false);

   const handleLocationVisibilityChange = () =>
      setLocationInputVisibility(!locationInputVisibility);

   const handleTagsVisibilityChange = () =>
      setTagsInputVisibility(!tagsInputVisibility);

   const handleFeelingVisibilityChange = () =>
      setFeelingModalVisible(!feelingModalVisible);

   const handleVisibilityChange = (e: RadioChangeEvent) =>
      setPostVisibility(e.target.value);

   const handleFeelingModalOk = (newFeeling: IFeeling | undefined) => {
      setFeeling(newFeeling);
      setFeelingModalVisible(false);
   };

   const handleChangeAction = (newAction: IAction | undefined) => {
      setAction(newAction);
      setFeelingModalVisible(false);
   };

   const handleChangeSubAction = (newAction: ISubAction | undefined) => {
      setSubAction(newAction);
      setFeelingModalVisible(false);
   };

   const handleImagesChange: UploadProps["onChange"] = async ({ fileList }) => {
      for (const file of fileList) {
         file.preview = await getBase64(file.originFileObj as FileType);
      }

      setImages(fileList);
   };

   const onFinish = async (values: ICreatePost) => {
      if (postType === "text") {
         const postImage = await getCapture();
         values.images = [];
         values.images[0] = postImage as Blob;
      }

      if (feeling && feeling.id !== undefined) {
         values.feelingId = feeling.id;
      }

      if (action && action.id !== undefined) {
         values.actionId = action.id;
      }

      if (subAction && subAction.id !== undefined) {
         values.subActionId = subAction.id;
      }

      const formData = new FormData();

      formData.append("content", values.content);
      formData.append("isArchive", "false");

      if (values.location) {
         formData.append("location", values.location);
      }

      formData.append("visibility", postVisibility);

      if (postVisibility === "friends except") {
         for (const friend of friendsExceptList) {
            formData.append("ExcludedFriends", friend.id);
         }
      }

      if (values.feelingId) {
         formData.append("feelingId", values.feelingId);
      }

      if (values.actionId) {
         formData.append("actionId", values.actionId);
      }

      if (values.subActionId) {
         formData.append("subActionId", values.subActionId);
      }

      for (const tag of tags) {
         formData.append("tags", tag);
      }

      if (values.images && values.images.length > 0) {
         for (const image of values.images) {
            formData.append("images", image);
         }
      }
      if (postType === "image") {
         for (const file of images) {
            formData.append("images", file.originFileObj as Blob);
         }
      }

      apiClient
         .post("/api/post/create", formData, {
            headers: {
               "content-type": "multipart/form-data",
            },
         })
         .then((res) => {
            console.log(res);
            message.success("Story successfully posted!");
            handleCancel();
         })
         .catch((error) => {
            console.log(error);
            message.error("Post story error!");
         });
   };

   const handleModalOk = () => {
      form.submit();
   };

   const avatarImg = useAvatar();

   const [form] = Form.useForm();

   return (
      <Modal
         title="Create publication"
         open={isModalOpen}
         onOk={handleModalOk}
         onCancel={handleCancel}
      >
         <Flex align="center" gap="middle">
            <Avatar
               size={92}
               src={avatarImg}
               style={{ minHeight: 92, minWidth: 92 }}
               alt="User avatar"
            />
            <Flex vertical gap="small">
               <p className="user-name">{`${user?.firstName} ${user?.lastName}`}</p>
               {feeling && (
                  <Flex gap="small" align="center">
                     <img
                        src={feeling.emoji}
                        alt="Feeling emoji"
                        style={{ height: 30, width: 30 }}
                     />
                     <span>{feeling.name}</span>
                  </Flex>
               )}
               <VisibilityButton
                  visibility={postVisibility}
                  setVisibilityModalVisible={setVisibilityModalVisible}
               />
            </Flex>
         </Flex>
         <Divider />
         <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
            <div ref={captureAreaRef}>
               <FormItem name="content">
                  <Input.TextArea
                     placeholder={`What's up, ${`${user?.firstName} ${user?.lastName}`}?`}
                     style={{
                        minHeight: 150,
                        background: postType === "text" ? background : "white",
                        color: postType === "text" ? "white" : "black",
                        textAlign: postType === "text" ? "center" : "start",
                     }}
                  />
               </FormItem>
            </div>

            {postType === "text" && (
               <BackgroundOptions setBackground={setBackground} />
            )}

            {locationInputVisibility && (
               <Form.Item name="location" label="Location">
                  <Input placeholder="Enter your location" />
               </Form.Item>
            )}

            <Flex vertical gap="middle">
               {tagsInputVisibility && <TagInput tags={tags} setTags={setTags} />}
               {tags.length !== 0 && <TagsList tags={tags} setTags={setTags} />}
            </Flex>

            {postType === "image" && images.length !== 0 && (
               <>
                  <Divider />
                  <ImagesCarousel images={images} />
                  <Divider />
               </>
            )}

            <AddToThePublicationButton
               tooltipTitle="Change post type"
               onClick={() => setPostType(postType === "image" ? "text" : "image")}
               imgSrc={postTypeImg}
               imgAlt="Change post type icon"
               imgStyle={{
                  boxShadow: "0px 4px 4px 0px #00000040",
               }}
            />

            <AddToThePublicationCard
               postType={postType}
               handleFeelingModalVisibilityChange={handleFeelingVisibilityChange}
               handleImagesChange={handleImagesChange}
               handleLocationInputVisibilityChange={handleLocationVisibilityChange}
               handleTagsInputVisibilityChange={handleTagsVisibilityChange}
               feelingEmoji={feeling ? feeling.emoji : feelingPng}
            />
         </Form>
         <PostVisibilityModal
            visibility={postVisibility}
            visibilityModalVisible={visibilityModalVisible}
            setVisibilityModalVisible={setVisibilityModalVisible}
            handleVisibilityChange={handleVisibilityChange}
            setFriendsExceptList={setFriendsExceptList}
         />
         <FeelingModal
            isModalOpen={feelingModalVisible}
            handleOk={handleFeelingModalOk}
            handleCancel={() => {
               setFeelingModalVisible(false);
            }}
            handleChangeAction={handleChangeAction}
            handleChangeSubAction={handleChangeSubAction}
         />
      </Modal>
   );
};

export default CreatePostModal;