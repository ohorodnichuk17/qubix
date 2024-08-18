import { Flex, Grid, Layout, message } from "antd";
import "./CreateStoryPage.css";
import { Content } from "antd/es/layout/layout";
import { apiClient } from "../../../../utils/api/apiClient";
import CreateStorySideBar from "./components/CreateStorySideBar";
import SelectStoryType from "./components/SelectStoryType";
import StoryPreview from "./components/StoryPreview";
import StorySettingsCard from "./components/StorySettingsCard";
import { CreateStoryProvider, useCreateStory } from "./context";
import useCapture from "./hooks/useCapture";
import { useNavigate } from "react-router-dom";

const CreateStoryContent = () => {
   const { storyType, setStoryType, text } = useCreateStory();
   const { captureAreaRef, getCapture } = useCapture();
   const navigate = useNavigate();

   const postStory = async () => {
      if (storyType == null) return;
      const story = await getCapture();

      const formData = new FormData();
      formData.append("Content", text ?? "");
      formData.append("Image", story as Blob);

      apiClient
         .post("/api/story/create", formData)
         .then((res) => {
            console.log(res);
            message.success("Story successfully posted!");
            navigate("/");
         })
         .catch((error) => {
            console.log(error);
            message.error("Post story error!");
         });
   };

   const screens = Grid.useBreakpoint();

   const isScreenSmallerThatMd =
      (screens.xs || screens.sm) &&
      !screens.md &&
      !screens.lg &&
      !screens.xl &&
      !screens.xxl;

   return (
      <Layout style={{ height: "100%" }}>
         {!isScreenSmallerThatMd && <CreateStorySideBar postStory={postStory} />}
         <Content className="content">
            {isScreenSmallerThatMd && (
               <StorySettingsCard
                  isSmallerThatMdScreen={isScreenSmallerThatMd}
                  postStory={postStory}
               />
            )}
            <Flex
               gap="middle"
               className="create-story-page"
               style={{
                  height: isScreenSmallerThatMd ? "fit-content" : "100%",
                  marginTop: isScreenSmallerThatMd ? 20 : 0,
               }}
            >
               {storyType == null && <SelectStoryType setStoryType={setStoryType} />}

               {storyType != null && (
                  <StoryPreview captureAreaRef={captureAreaRef} />
               )}
            </Flex>
         </Content>
      </Layout>
   );
};

const CreateStoryPage = () => (
   <CreateStoryProvider>
      <CreateStoryContent />
   </CreateStoryProvider>
);

export default CreateStoryPage;
