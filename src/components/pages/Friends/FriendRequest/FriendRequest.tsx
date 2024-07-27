import { Button, Grid, Layout, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import FriendSidebar from "../FriendPage/FriendSidebar";
import { UserAddOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const FriendRequest = () => {
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const friendId = searchParams.get("friendId");
   const screens = useBreakpoint();

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
      // <Layout style={{ marginLeft: screens.xs ? 80 : 256, transition: 'margin-left 0.2s' }}>
      //    <FriendSidebar></FriendSidebar>
      //    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
      //       <p>{friendId}</p>
      //       <p>{friend?.Email}</p>
      //       <p>{friend?.UserName}</p>

      //       <Button onClick={acceptFriendRequest}>Accept request</Button>
      //    </Content>
      // </Layout>      
      <div>
         <FriendSidebar select="2"></FriendSidebar>
         <Layout style={{ marginLeft: screens.xs ? 80 : 256, transition: 'margin-left 0.2s' }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', textAlign: "center" }}>
               <UserAddOutlined style={{ fontSize: '64px' }} />
               <Title level={3}>Friend requests will be shown here</Title>
            </Content>
         </Layout>
      </div>
   );
};

export default FriendRequest;
