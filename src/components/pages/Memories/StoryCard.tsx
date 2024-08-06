import React from "react";
import { Avatar } from "antd";
import { APP_ENV } from "../../../env";
import type { IStory } from "../Story/list/types";
import useAvatar from "../../../hooks/useAvatar";

interface StoryCardProps {
   story: IStory;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
   const avatarImg = useAvatar();
   return (
      <div
         style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            overflow: "hidden",
            background: `url(${APP_ENV.BASE_URL}/images/stories/${story.image}) center no-repeat`,
            backgroundSize: "cover",
            height: "200px",
            position: "relative",
            color: "#fff",
         }}
      >
         <Avatar
            size={80}
            src={
               avatarImg
            }
            style={{
               margin: "15px",
               position: "absolute",
               top: "15px",
               left: "15px",
            }}
         />
         <div
            style={{
               position: "absolute",
               bottom: "15px",
               left: "15px",
               backgroundColor: "rgba(0, 0, 0, 0.5)",
               borderRadius: "8px",
               padding: "10px",
            }}
         >
            <h3 style={{ margin: 0 }}>{story.user.userName}</h3>
            <p style={{ margin: 0 }}>{story.content}</p>
         </div>
      </div>
   );
};

export default StoryCard;
