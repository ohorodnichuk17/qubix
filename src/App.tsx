import { Route, Routes } from 'react-router-dom';
import RealtorRegisterPage from './pages/account/register/RegisterPage';

const App = () => {
   return (
      <Routes>
         <Route path="*" element={<RealtorRegisterPage />} />
      </Routes>
   );
};

export default App;
