import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ContainerDefault from "./components/containers/ContainerDefault/ContainerDefault";
import ChangeEmailPage from "./components/pages/ChangeEmailPage/ChangeEmailPage";
import EmailConfirmationRequired from "./components/pages/EmailConfirmationRequired/EmailConfirmationRequired";
import EmailSuccessfullyConfirmedPage from "./components/pages/EmailSuccessfullyConfirmedPage/EmailSuccessfullyConfirmedPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "./components/pages/Home/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage/ResetPasswordPage";
import SetNewPasswordPage from "./components/pages/SetNewPasswordPage/SetNewPasswordPage";
import CreateStoryPage from "./components/pages/Story/CreateStoryPage/CreateStoryPage";
import UserProfilePage from "./components/pages/UserProfilePage/UserProfilePage";
import AddFriend from "./components/pages/Friends/AddFriend/AddFriend";
import FriendRequest from "./components/pages/Friends/FriendRequest/FriendRequest";

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
            <Route path="/" element={<ContainerDefault />}>
               <Route index element={<HomePage />} />
               <Route path="login" element={<LoginPage />} />
               <Route path="register" element={<RegisterPage />} />
               <Route
                  path="profile"
                  element={
                     <PrivateRoute>
                        <UserProfilePage />
                     </PrivateRoute>
                  }
               />
               <Route path="forgot-password" element={<ForgotPasswordPage />} />
               <Route
                  path="reset-password"
                  element={
                     <PrivateRoute>
                        <ResetPasswordPage />
                     </PrivateRoute>
                  }
               />
               <Route
                  path="change-email"
                  element={
                     <PrivateRoute>
                        <ChangeEmailPage />
                     </PrivateRoute>
                  }
               />
               <Route path="set-new-password" element={<SetNewPasswordPage />} />
               <Route
                  path="email-confirmed"
                  element={<EmailSuccessfullyConfirmedPage />}
               />
               <Route
                  path="email-confirmation-required"
                  element={<EmailConfirmationRequired />}
               />

               <Route path="story">
                  <Route
                     index
                     element={
                        <PrivateRoute>
                           <CreateStoryPage />
                        </PrivateRoute>
                     }
                  />
               </Route>

               <Route path="friends">
                  <Route
                     path="add"
                     element={
                        <PrivateRoute>
                           <AddFriend />
                        </PrivateRoute>
                     }
                  />
                  <Route
                     path="request"
                     element={
                        <PrivateRoute>
                           <FriendRequest />
                        </PrivateRoute>
                     }
                  />
               </Route>
            </Route>
         </Routes>
      </ConfigProvider>
   );
};

export default App;
