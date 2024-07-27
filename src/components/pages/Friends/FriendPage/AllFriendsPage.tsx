import { Button, Grid, Layout, message, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FriendSidebar from "./FriendSidebar";

const { Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const AllFriendsPage = () => {
   const screens = useBreakpoint();

   return (
      <div>
         <FriendSidebar select="3"></FriendSidebar>
         <Layout style={{ marginLeft: screens.xs ? 80 : 256, transition: 'margin-left 0.2s' }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', textAlign: "center" }}>
               <UserOutlined style={{ fontSize: '64px' }} />
               <Title level={3}>Your friends will be shown here</Title>
            </Content>
         </Layout>
      </div>
   );
};

export default AllFriendsPage;
