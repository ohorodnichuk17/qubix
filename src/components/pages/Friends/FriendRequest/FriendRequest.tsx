import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";

const FriendRequest = () => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const friendId = searchParams.get("friendId");

   const { user } = useAppSelector((state) => state.account);
   const [friend, setFriend] = useState(null);

   useEffect(() => {
      apiClient
         .get(
            `/api/friends/get-friend-by-id?userId=${user?.id}&friendId=${friendId}`,
         )
         .then((res) => {
            setFriend(res.data);
         });
   }, [user?.id, friendId]);

   const acceptFriendRequest = () => {
      const values = {
         userId: user?.id,
         friendId: friendId,
      };

      apiClient
         .post("/api/friends/accept-friend-request", values)
         .then(() => {
            message.success("Friend Request accepted!");
            navigate("/");
         })
         .catch(() => {
            message.error("Friend request accepting error!");
         });
   };

   return (
      <>
         <p>{friendId}</p>
         <p>{friend?.Email}</p>
         <p>{friend?.UserName}</p>

         <Button onClick={acceptFriendRequest}>Accept request</Button>
      </>
   );
};

export default FriendRequest;
