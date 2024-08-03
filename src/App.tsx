import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ContainerDefault from "./components/containers/ContainerDefault/ContainerDefault";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import AdminDashboard from "./components/pages/Admin/AdminDashboard";

const App = () => {
   return (
      <ConfigProvider
         theme={{
            token: {
               fontFamily: "Montserrat",
            },
            components: {
               Button: {
                  defaultBg: "#FF7F50",
                  defaultHoverBg: "#FFA07A",
                  defaultActiveBg: "#FF6347",
                  colorText: "white",
                  defaultColor: "white",
                  defaultHoverColor: "white",
                  defaultActiveColor: "white",
                  colorPrimaryActive: "white",
                  defaultBorderColor: "#FF7F50",
                  defaultHoverBorderColor: "#FFA07A",
                  colorPrimaryBg: "#FF7F50",
                  colorPrimaryText: "white",
                  primaryColor: "white",
                  colorBgMask: "white",
                  colorPrimaryBorder: "#FF7F50",
                  colorPrimaryBorderHover: "#FFA07A",
                  colorPrimaryHover: "#FFA07A",
                  colorPrimaryBgHover: "#FFA07A",
                  fontFamily: "Montserrat",
               },
               Input: {
                  colorBorder: "#FF7F50",
                  hoverBorderColor: "#FFA07A",
                  activeBorderColor: "#FF6347",
               },
            },
         }}
      >
         <Routes>
            <Route path="/" element={
               <PrivateRoute>
                  <AdminDashboard />
               </PrivateRoute>
            } />
            <Route path="/" element={<ContainerDefault />}>
               <Route path="login" element={<LoginPage />} />
               <Route path="register" element={<RegisterPage />} />
            </Route>
         </Routes>
      </ConfigProvider>
   );
};

export default App;
