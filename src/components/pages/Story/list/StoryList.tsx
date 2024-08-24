import { useEffect, useState } from "react";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IStory } from "./types";
import { Avatar, Flex, message } from "antd";
import { APP_ENV } from "../../../../env";
import { avatar } from "../../../../utils/images";
import StoryModal from "../../../storyModal/StoryModal";

const StoryList = () => {
   const [stories, setStories] = useState<IStory[]>([]);
   const [currentStory, setCurrentStory] = useState<IStory>();
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      apiClient
         .get("api/story/friends")
         .then((res) => {
            setStories(res.data);
         })
         .catch(() => {
            message.error("Stories fetching error");
         });
   }, []);

   const groupedStories = stories.reduce(
      (acc: Record<string, IStory[]>, story: IStory) => {
         if (!acc[story.user.id]) {
            acc[story.user.id] = [];
         }
         acc[story.user.id].push(story);
         return acc;
      },
      {},
   );

   const uniqueUsers = Object.values(groupedStories).map(
      (storyGroup) => storyGroup[0],
   );

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

   const handleDeleteStory = async (storyId: string) => {
      try {
         await apiClient.delete(`api/story/delete/${storyId}`);
         setStories(stories.filter((story) => story.id !== storyId));
         message.success("Story deleted successfully");
         setIsModalOpen(false);
      } catch (error) {
         message.error("Story deletion error");
      }
   };


   return (
      <>
         <Flex
            gap="small"
            style={{ width: "100%", maxWidth: 600, overflowX: "auto" }}
         >
            {uniqueUsers.map((story) => (
               <Avatar
                  key={story.id}
                  onClick={() => {
                     setCurrentStory(story);
                     setIsModalOpen(true);
                  }}
                  style={{
                     border: " 3px solid #7F50FF",
                     cursor: "pointer",
                     minHeight: 80,
                     minWidth: 80,
                  }}
                  size={80}
                  src={
                     story.user.avatar === null
                        ? avatar
                        : `${APP_ENV.BASE_URL}/images/avatars/${story.user.avatar}`
                  }
               />
            ))}
         </Flex>

         <StoryModal
            currentStory={currentStory}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onNavigate={handleNavigateStory}
            onDelete={handleDeleteStory}
         />
      </>
   );
};

export default StoryList;
