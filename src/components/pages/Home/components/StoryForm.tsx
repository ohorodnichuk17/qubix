import { bluePlus } from '../../../../utils/images/index';
import './StoryForm.css';
import { useNavigate } from 'react-router-dom';

export const StoryForm = () => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate('/story');
   };

   return (
      <div className="create-story" onClick={handleClick}>
         <img src={bluePlus} alt="Create story" className="icon" />
         <div className="text">
            <strong>Create story</strong>
            <p>Share a photo or write something</p>
         </div>
      </div>
   );
};

export default StoryForm;
