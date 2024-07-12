import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { photoImg, feeling, avatar as defaultAvatar } from '../../../../utils/images/index';
import './PostForm.css';
import { useAppSelector } from '../../../../hooks/redux';
import { APP_ENV } from '../../../../env';

export const PostForm = () => {
   const { user } = useAppSelector(state => state.account);
   const isLogin = !!user;

   const avatarSrc = user && user.avatar && user.avatar !== '/images/avatars/' ? `${APP_ENV.BASE_URL}${user.avatar}` : defaultAvatar;

   return (
      <div className="whats-up">
         <Avatar
            src={avatarSrc}
            size={50}
         />
         <div className="user-info">
            <span className="username">
               {user?.firstName} {user?.lastName}
            </span>
            <input
               type="text"
               placeholder={`What's up, ${user?.firstName} ${user?.lastName}?`}
               className="input-box"
            />
         </div>
         <div className="actions">
            <img src={photoImg} alt="Photo" className="icon" />
            <img src={feeling} alt="Feelings" className="icon" />
         </div>
      </div>
   );
};

export default PostForm;
