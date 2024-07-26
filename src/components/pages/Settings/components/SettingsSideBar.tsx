import { Grid, Layout, Menu, MenuProps, Divider } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { blocked, questionmark, lockImg, shield } from '../../../../utils/images/index';
import { NavLink } from 'react-router-dom';
const { useBreakpoint } = Grid;

export const SettingsSideBar = () => {
   const screens = useBreakpoint();

   const menuItems: MenuProps["items"] = [
      {
         key: "1",
         label: <NavLink to="./privacy">Account privacy</NavLink>,
         icon: <img src={shield} alt="Shield Icon" style={{ width: '24px', height: '24px' }} />,
      },
      {
         key: "2",
         label: <NavLink to="./blocked">Blocked users</NavLink>,
         icon: <img src={blocked} alt="Blocked Icon" style={{ width: '24px', height: '24px' }} />,
      },
      {
         key: "3",
         label: <NavLink to="./reset-password">Reset password</NavLink>,
         icon: <img src={lockImg} alt="Lock Icon" style={{ width: '24px', height: '24px' }} />,
      },
      {
         type: 'divider',
         key: "divider-1"
      },
      {
         key: "4",
         label: <NavLink to="./help">Questions/help</NavLink>,
         icon: <img src={questionmark} alt="Question Icon" style={{ width: '24px', height: '24px' }} />,
      },
   ];

   return (
      <Sider
         width={256}
         style={{
            background: "#fff",
            height: "calc(100vh - 64px)",
            position: "fixed",
            left: 0,
            top: 64,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
         }}
         breakpoint="lg"
         collapsedWidth="80"
         collapsed={screens.xs}
      >
         <Layout>
            <h2 style={{ textAlign: "center", background: "white", padding: "10px", margin: "0px", marginBottom: "-10px", borderRadius: "10px 10px 0px 0px" }}>Settings</h2>
            <Menu
               style={{ height: '100' }}
               defaultSelectedKeys={['1']}
               mode="inline"
               items={menuItems}
            />
         </Layout>
      </Sider>
   );
};

export default SettingsSideBar;
