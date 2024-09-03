import { useState } from 'react';
import { Avatar, Divider } from 'antd';
import { photoImg, feeling } from '../../../../utils/images/index';
import './PostForm.css';
import { useAppSelector } from '../../../../hooks/redux';
import useAvatar from '../../../../hooks/useAvatar';
import CreatePostModal from '../../../post/create/CreatePostModal';
import FeelingModal from '../../../feelings/FeelingModal';

export const PostForm = () => {
   const { user } = useAppSelector(state => state.account);
   const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
   const [isFeelingModalOpen, setIsFeelingModalOpen] = useState(false);

   const avatarImg = useAvatar();

   const openCreatePostModal = () => {
      setIsCreatePostModalOpen(true);
   };

   const openFeelingModal = () => {
      setIsFeelingModalOpen(true);
   };

   const handleCreatePostModalOk = () => {
      setIsCreatePostModalOpen(false);
   };

   const handleCreatePostModalCancel = () => {
      setIsCreatePostModalOpen(false);
   };

   const handleFeelingModalOk = () => {
      setIsFeelingModalOpen(false);
   };

   const handleFeelingModalCancel = () => {
      setIsFeelingModalOpen(false);
   };

   const handleChangeAction = () => {
   };

   const handleChangeSubAction = () => {
   };

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
                    onClick={openCreatePostModal}
                />
             </div>
          </div>
          <Divider style={{ margin: '10px 0' }} />

          <div className="actions">
             <div className="action-item" onClick={openCreatePostModal}>
                <img src={photoImg} alt="Photo" className="icon" />
                <span className="action-label">Photo</span>
             </div>
             <div className="action-item" onClick={openFeelingModal}>
                <img src={feeling} alt="Feelings" className="icon" />
                <span className="action-label">Feelings/actions</span>
             </div>
          </div>

          <CreatePostModal
              isModalOpen={isCreatePostModalOpen}
              handleOk={handleCreatePostModalOk}
              handleCancel={handleCreatePostModalCancel}
          />

          <FeelingModal
              isModalOpen={isFeelingModalOpen}
              selectedTab="feelings"
              handleOk={handleFeelingModalOk}
              handleChangeAction={handleChangeAction}
              handleChangeSubAction={handleChangeSubAction}
              handleCancel={handleFeelingModalCancel}
          />
       </div>
   );
};

export default PostForm;
