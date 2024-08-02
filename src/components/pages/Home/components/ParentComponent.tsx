import useState } from 'react';
import PostForm from './PostForm';
import CreatePostModal from '../../../post/create/CreatePostModal';

const ParentComponent = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => {
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   return (
      <div>
         <PostForm onOpenModal={openModal} />
         <CreatePostModal
            isModalOpen={isModalOpen}
            handleOk={closeModal}
            handleCancel={closeModal}
         />
      </div>
   );
};

export default ParentComponent;
