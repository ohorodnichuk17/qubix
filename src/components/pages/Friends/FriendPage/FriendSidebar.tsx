import React from 'react';
import { Grid, Layout, Menu, MenuProps } from 'antd';
import {
  UsergroupAddOutlined,
  UserAddOutlined,
  UserOutlined,
  GiftOutlined
} from '@ant-design/icons';
import { NavLink, Outlet } from 'react-router-dom';
const { useBreakpoint } = Grid;
import Sider from 'antd/es/layout/Sider';

type FriendSideBarProps = {
	select: string;
};

const FriendSidebar = ({select} : FriendSideBarProps) => {
  const screens = useBreakpoint();

  const menuItems: MenuProps["items"] = [
    {
       key: "1",
       label: <NavLink to="/friends">Main</NavLink>,
       icon: <UsergroupAddOutlined />,
    },
    {
       key: "2",
       label: <NavLink to="/friends/request">Friend request</NavLink>,
       icon: <UserAddOutlined />,
    },
    {
       key: "3",
       label: <NavLink to="/friends/all">All friends</NavLink>,
       icon: <UserOutlined />,
    },
    {
       key: "4",
       label: <NavLink to="/friends/birthday">Birthdays</NavLink>,
       icon: <GiftOutlined />,
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
        <h2 style={{textAlign: "center", background: "white", padding: "10px", margin: "0px", marginBottom: "-10px", borderRadius: "10px 10px 0px 0px"}}>Friends</h2>
        <Menu
          style={{ height: '100' }}
          defaultSelectedKeys={[select]}
          mode="inline"
          items={menuItems}
          />
      </Layout>
    </Sider>
  );
};

export default FriendSidebar;
