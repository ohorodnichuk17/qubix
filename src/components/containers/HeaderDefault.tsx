import { Button, Input, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import ButtonGroup from "antd/es/button/button-group";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/account/account.slice';
import './HeaderDefault.css'
import logo from '../../assets/authentication/logotype.png';

const { Header } = Layout;

const HeaderDefault = () => {
   const dispatch = useAppDispatch();
   const { isLogin, user } = useAppSelector(state => state.account);

   const handleLogout = () => {
      dispatch(logout());
   };

   return (
      <Header className="custom-header">
         <div className="left-section">
            <Input
               className="search-box"
               placeholder="Search"
               prefix={<SearchOutlined style={{ color: '#000000' }} />}
            />
            <div className="header-gradient">
               <img src={logo} alt="logo" className="header-logo" />
               <div className="header-text">
                  <span className='header-text-regular'>This is</span>
                  <span className="header-text-bold">Quilt</span>
               </div>
            </div>
         </div>

         {isLogin ? (
            <ButtonGroup size="large" style={{ gap: '20px' }}>
               <Button className="minimalist-button">
                  {`${user?.firstName} ${user?.lastName}`}
               </Button>
               <Button>
                  <Link to="/story">
                     Create story
                  </Link>
               </Button>
               <Button type='link' onClick={() => handleLogout()} className="minimalist-button">
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
