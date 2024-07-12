import { activePlus } from '../../../../utils/images/index';
import './StoryForm.css';
import { useNavigate } from 'react-router-dom'; // для використання хука useNavigate

export const StoryForm = () => {
   const navigate = useNavigate(); // отримуємо доступ до навігації

   const handleClick = () => {
      navigate('/story'); // перенаправлення на сторінку /story
   };

   return (
      <div className="create-story" onClick={handleClick}>
         <div className="icon-wrapper">
            <img src={activePlus} alt="Create story" className="icon" />
         </div>
         <div className="text">
            <strong>Create story</strong>
            <p>Share a photo or write something</p>
         </div>
      </div>
   );
};

export default StoryForm;
