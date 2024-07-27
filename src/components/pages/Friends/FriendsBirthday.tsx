import { Button, Grid, Layout, message } from "antd";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const FriendsBirthday = () => {
   const screens = useBreakpoint();

   return (
      <Layout style={{ marginLeft: screens.xs ? 80 : 256, transition: 'margin-left 0.2s' }}>
         <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <h1>Birthdays of your friends will be shown here</h1>
         </Content>
      </Layout>
   );
};

export default FriendsBirthday;
