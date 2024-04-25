import { Route, Routes } from 'react-router-dom';
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import { ConfigProvider } from 'antd';
import LoginPage from './components/pages/LoginPage/LoginPage';

const App = () => {
   return (
      <ConfigProvider
         theme={{
            token: {
               fontFamily: 'Montserrat'
            },
            components: {
               Button: {
                  defaultBg: '#FF7F50',
                  defaultHoverBg: '#FFA07A',
                  defaultActiveBg: '#FF6347',
                  colorText: 'black',
                  defaultColor: 'black',
                  defaultHoverColor: 'black',
                  defaultActiveColor: 'black',
                  colorPrimaryActive: 'black',
                  defaultBorderColor: '#FF7F50',
                  defaultHoverBorderColor: '#FFA07A',

                  colorPrimaryBg: '#FF7F50',
                  colorPrimaryText: 'black',

                  primaryColor: 'black',
                  colorBgMask: 'black',
                  colorPrimaryBorder: '#FF7F50',
                  colorPrimaryBorderHover: '#FFA07A',
                  colorPrimaryHover: '#FFA07A',
                  colorPrimaryBgHover: '#FFA07A',

                  fontFamily: 'Montserrat'
               },
               Input: {
                  colorBorder: '#FF7F50',
                  hoverBorderColor: '#FFA07A',
                  activeBorderColor: '#FF6347'
               }
            },
         }}
      >

         <Routes>
            <Route index element={<RegisterPage />} />
            <Route path='login' element={<LoginPage />} />
         </Routes>
      </ConfigProvider>
   );
};

export default App;
