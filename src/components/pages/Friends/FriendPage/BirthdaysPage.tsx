import { Grid, Layout, Typography } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import FriendSidebar from "./FriendSidebar";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const BirthdaysPage = () => {
   const screens = useBreakpoint();

   return (
      <div>
         <FriendSidebar select="4"></FriendSidebar>
         <Layout style={{ marginLeft: screens.xs ? 80 : 256, transition: 'margin-left 0.2s' }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', textAlign: "center" }}>
               <GiftOutlined style={{ fontSize: '64px' }} />
               <Title level={3}>Birthdays of your friends will be shown here</Title>
            </Content>
         </Layout>
      </div>
   );
};

export default BirthdaysPage;
