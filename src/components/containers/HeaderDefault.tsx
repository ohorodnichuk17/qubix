import { Button, Layout, Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import ButtonGroup from "antd/es/button/button-group";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/account/account.slice';
import './css/HeaderDefault.css';
import logo from '../../assets/logotype.png';

const { Header } = Layout;

const HeaderDefault = () => {
   const dispatch = useAppDispatch();
   const { isLogin, user } = useAppSelector(state => state.account);

   const handleLogout = () => {
      dispatch(logout());
   };

   const items: MenuProps["items"] = [
      {
         label: <Link to={`/`}>Quilt</Link>,
         key: 'mail',
      }
   ];

   return (
      <Header className="custom-header">
         <div className="header-gradient">
            <img src={logo} alt="logo" className="header-logo" />
            <div className="header-text">
               <span className='header-text-regular'>This is</span>
               <span className="header-text-bold">Quilt</span>
            </div>
         </div>
         <Menu
            theme="light"
            mode="horizontal"
            selectable={false}
            items={items}
            style={{ flex: 1, minWidth: 0, backgroundColor: 'transparent' }}
         />

         {isLogin ? (
            <ButtonGroup size="large" style={{ gap: '20px' }}>
               <Button className="minimalist-button">
                  {`${user?.firstName} ${user?.lastName}`}
               </Button>
               <Button type='link' onClick={handleLogout} className="minimalist-button">
                  Logout
               </Button>
               <Button type='link' className="minimalist-button">
                  <Link to='/change-email'>
                     Change Email
                  </Link>
               </Button>
               <Button type='link' className="minimalist-button">
                  <Link to='/forgot-password'>
                     Forgot password
                  </Link>
               </Button>
               <Button type='link' className="minimalist-button">
                  <Link to='/reset-password'>
                     Reset password
                  </Link>
               </Button>
            </ButtonGroup>
         ) : (
            <div style={{ display: 'flex', gap: '20px' }}>
               <Link to="/login" style={{ color: '#FFFAFA', textDecoration: 'none' }}>
                  <Button icon={<UserOutlined />} className="minimalist-button login">
                     Login
                  </Button>
               </Link>
               <Link to="/register" style={{ color: '#FFFAFA', textDecoration: 'none' }}>
                  <Button icon={<UserAddOutlined />} className="minimalist-button register">
                     Register
                  </Button>
               </Link>
            </div>
         )}
      </Header>
   );
};

export default HeaderDefault;
