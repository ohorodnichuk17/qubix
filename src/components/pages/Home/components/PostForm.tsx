import { Avatar, Divider, Grid } from 'antd';
import { photoImg, feeling } from '../../../../utils/images/index';
import './PostForm.css';
import { useAppSelector } from '../../../../hooks/redux';
import useAvatar from '../../../../hooks/useAvatar';

export const PostForm = () => {
   const { user } = useAppSelector(state => state.account);

   const avatarImg = useAvatar();

   return (
      <div className="whats-up">
         <div className="top-section">
            <Avatar
               src={avatarImg}
               size={50}
            />
            <div className="user-info">
               <input
                  type="text"
                  placeholder={`What's up, ${user?.firstName} ${user?.lastName}?`}
                  className="input-box"
               />
            </div>
         </div>
         <Divider style={{ margin: '10px 0' }} />

         <div className="actions">
            <div className="action-item">
               <img src={photoImg} alt="Photo" className="icon" />
               <span className="action-label">Photo</span>
            </div>
            <div className="action-item">
               <img src={feeling} alt="Feelings" className="icon" />
               <span className="action-label">Feelings/actions</span>
            </div>
         </div>
      </div>
   );
};

export default PostForm;
