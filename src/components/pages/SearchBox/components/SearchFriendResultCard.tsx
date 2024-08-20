import { Card, Avatar, Badge } from "antd";
import StoryModal from "../../../storyModal/StoryModal";
import type { ISearchUserResult } from "../types";
import { useEffect, useState } from "react";
import type { IStory } from "../../Story/list/types";
import { avatar } from "../../../../utils/images";
import { APP_ENV } from "../../../../env";
import SendFriendRequestButton from "../../../featured/SendFriendRequestButton/SendFriendRequestButton";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import AcceptFriendRequestButton from "../../../featured/AcceptFriendRequestButton/AcceptFriendRequestButton";

type SearchFriendResultCardProps = {
   friend: ISearchUserResult;
};

const SearchFriendResultCard = ({ friend }: SearchFriendResultCardProps) => {
	const { user } = useAppSelector((state) => state.account);
   const [currentStory, setCurrentStory] = useState<IStory>();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [relationshipsStatus, setRelationshipsStatus] = useState<number>();

   useEffect(() => {
      for (const story of friend.stories) {
         story.user = friend;
      }
		updateRelationshipStatus();
   }, [friend]);

   const isCurrentUserProfile = friend.id === user?.id;

	const updateRelationshipStatus = () => {
		if (!isCurrentUserProfile) {
			apiClient
				.get(`api/friends/relationships-status?friendId=${friend.id}`)
				.then((res) => {
					setRelationshipsStatus(res.data);
				});
		}
	};

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
                     if (friend.stories.length > 0) {
                        setCurrentStory(friend.stories[0]);
                        setIsModalOpen(true);
                     }
                  }}
                  style={{
                     border: friend.stories.length > 0 ? "3px solid #7F50FF" : "none",
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
               {!isCurrentUserProfile && (
						<>
							{relationshipsStatus === 0 && (
								<SendFriendRequestButton
									friendId={friend.id}
									afterSendRequestFn={updateRelationshipStatus}
									type="primary"
									style={{ backgroundColor: "orange", borderColor: "orange" }}
								/>
							)}
							{relationshipsStatus === 1 && (
								<Badge count={"friend"} color="orange" />
							)}
							{relationshipsStatus === 2 && (
                        <AcceptFriendRequestButton friendId={friend.id} afterAcceptRequestFn={updateRelationshipStatus}/>
							)}
							{relationshipsStatus === 3 && (
								<Badge count={"wait to accept"} color="orange" />
							)}
						</>
					)}
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