import { Avatar, Layout, Menu } from 'antd';
import { action, feeling, friendsForSidePanel, memories, messengerForSidePanel, avatar } from '../../utils/images/index';
import './SideBar.css';
import { useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export const SideBar = () => {
   const account = useAppSelector(state => state.account);

   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Sider
            width={250}
            style={{
               background: '#fff',
               height: 'calc(100vh - 64px)',
               position: 'fixed',
               left: 0,
               top: 64,
               boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' // Adding shadow here
            }}
         >
            <div className="avatar-container">
               <Link to="/profile">
                  <Avatar
                     src={account.user?.avatar ? `http://localhost:5181${account.user.avatar}` : avatar}
                     size={50}
                  />
                  <span className="username">
                     {account.user?.firstName} {account.user?.lastName}
                  </span>
               </Link>
            </div>
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
               <Menu.Item key="1" icon={<img src={messengerForSidePanel} alt="Messenger" className="menu-icon" />}>
                  Messenger
               </Menu.Item>
               <Menu.Item key="2" icon={<img src={friendsForSidePanel} alt="Search Friends" className="menu-icon" />}>
                  Search friends
               </Menu.Item>
               <Menu.Item key="3" icon={<img src={memories} alt="Memories" className="menu-icon" />}>
                  Memories
               </Menu.Item>
               <Menu.Item key="4" icon={<img src={feeling} alt="Feelings" className="menu-icon" />}>
                  Feelings
               </Menu.Item>
               <Menu.Item key="5" icon={<img src={action} alt="Actions" className="menu-icon" />}>
                  Actions
               </Menu.Item>
            </Menu>
         </Sider>
      </Layout>
   );
};

export default SideBar;
