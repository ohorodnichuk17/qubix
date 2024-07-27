import { Grid, Layout, Typography } from "antd";
import FriendSidebar from "./FriendSidebar";
import MainPage from "./MainPage";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const FriendPage = () => {
   const screens = useBreakpoint();

   return (
      <div>
         <FriendSidebar></FriendSidebar>
         <Layout style={{ marginLeft: screens.xs ? 80 : 256, transition: 'margin-left 0.2s' }}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <MainPage></MainPage>
            </Content>
         </Layout>
      </div>
   );
};

export default FriendPage;
