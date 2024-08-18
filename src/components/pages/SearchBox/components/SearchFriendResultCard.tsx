import { Card, Avatar } from "antd";
import StoryModal from "../../../storyModal/StoryModal";
import type { ISearchUserResult } from "../types";
import { useEffect, useState } from "react";
import type { IStory } from "../../Story/list/types";
import { avatar } from "../../../../utils/images";
import { APP_ENV } from "../../../../env";
import SendFriendRequestButton from "../../../featured/SendFriendRequestButton/SendFriendRequestButton";

type SearchFriendResultCardProps = {
   friend: ISearchUserResult;
};

const SearchFriendResultCard = ({ friend }: SearchFriendResultCardProps) => {
   const [currentStory, setCurrentStory] = useState<IStory>();
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      for (const story of friend.stories) {
         story.user = friend;
      }
   }, [friend]);

   const handleNavigateStory = (type: "next" | "prev") => {
      if (!currentStory) return;

      let index = friend.stories.indexOf(currentStory);
      type === "next" ? index++ : index--;

      if (index >= 0 && index < friend.stories.length) {
         setCurrentStory(friend.stories[index]);
      } else {
         setIsModalOpen(false);
      }
   };

   const avatarUrl = friend.avatar
      ? `${APP_ENV.BASE_URL}/images/avatars/${friend.avatar}`
      : avatar;

   return (
      <>
         <Card style={{ maxWidth: "400px", margin: "10px auto" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
               <Avatar
                  size={60}
                  src={avatarUrl}
                  onClick={() => {
                     setCurrentStory(friend.stories[0]);
                     setIsModalOpen(true);
                  }}
                  style={{
                     border: " 3px solid #7F50FF",
                     cursor: "pointer",
                     minHeight: 60,
                     minWidth: 60,
                  }}
               />
               <h3
                  style={{ marginLeft: "10px" }}
               >{`${friend.firstName} ${friend.lastName}`}</h3>
            </div>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
               <SendFriendRequestButton friendId={friend.id} afterSendRequestFn={() => { }} type="primary"
                  style={{ backgroundColor: "orange", borderColor: "orange" }} />
            </div>
         </Card>
         <StoryModal
            currentStory={currentStory}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onNavigate={handleNavigateStory}
         />
      </>
   );
};

export default SearchFriendResultCard;