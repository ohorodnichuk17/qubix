import { ConfigProvider } from "antd";
import { Route, Routes } from "react-router-dom";
import ChangeEmailPage from "./components/authentication/ChangeEmailPage/ChangeEmailPage";
import EmailConfirmationRequired from "./components/authentication/EmailConfirmationRequired/EmailConfirmationRequired";
import EmailSuccessfullyConfirmedPage from "./components/authentication/EmailSuccessfullyConfirmedPage/EmailSuccessfullyConfirmedPage";
import ForgotPasswordPage from "./components/authentication/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "./components/authentication/LoginPage/LoginPage";
import RegisterPage from "./components/authentication/RegisterPage/RegisterPage";
import ResetPasswordPage from "./components/authentication/ResetPasswordPage/ResetPasswordPage";
import SetNewPasswordPage from "./components/authentication/SetNewPasswordPage/SetNewPasswordPage";
import CreateStoryContainer from "./components/containers/createStory/CreateStoryContainer";
import ContainerDefault from "./components/containers/default/ContainerDefault";
import FriendsContainer from "./components/containers/friends/FriendsContainer";
import SettingsContainer from "./components/containers/settings/SettingsContainer";
import PrivateRoute from "./components/featured/PrivateRoute/PrivateRoute";
import AllFriendsPage from "./components/friends/all/AllFriendsPage";
import FriendRecommendationsPage from "./components/friends/recommendations/FriendRecommendationsPage";
import FriendRequestsPage from "./components/friends/requests/FriendRequestsPage";
import HomePage from "./components/home/HomePage";
import MemoriesPage from "./components/memories/MemoriesPage";
import MessengerPage from "./components/messenger/MessengerPage";
import UserProfilePage from "./components/profile/UserProfilePage";
import FriendsSearchPage from "./components/search/friends/FriendsSearchPage";
import SearchPostsByTagPage from "./components/search/posts/SearchPostsByTagPage";
import AccountDeletedSuccessfullyPage from "./components/settings/delete-profile/AccountDeletedSuccessfullyPage";
import DeleteProfilePage from "./components/settings/delete-profile/DeleteProfilePage";
import HelpPage from "./components/settings/help/HelpPage";
import OnlineStatusPage from "./components/settings/online-status/OnlineStatusPage";
import PrivacyPage from "./components/settings/privacy/PrivacyPage";
import CreateStoryPage from "./components/story/create/CreateStoryPage";

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
						textHoverBg: "transparent",
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
				<Route path="/friends" element={<FriendsContainer />}>
					<Route
						index
						element={
							<PrivateRoute>
								<FriendRecommendationsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="request"
						element={
							<PrivateRoute>
								<FriendRequestsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="all"
						element={
							<PrivateRoute>
								<AllFriendsPage />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path="/story" element={<CreateStoryContainer />}>
					<Route
						index
						element={
							<PrivateRoute>
								<CreateStoryPage />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path="settings" element={<SettingsContainer />}>
					<Route
						index
						element={
							<PrivateRoute>
								<PrivacyPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="privacy"
						element={
							<PrivateRoute>
								<PrivacyPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="reset-password"
						element={
							<PrivateRoute>
								<ResetPasswordPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="help"
						element={
							<PrivateRoute>
								<HelpPage />
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
					<Route
						path="delete-profile"
						element={
							<PrivateRoute>
								<DeleteProfilePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="online-status"
						element={
							<PrivateRoute>
								<OnlineStatusPage />
							</PrivateRoute>
						}
					/>
				</Route>
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
					<Route path="set-new-password" element={<SetNewPasswordPage />} />
					<Route
						path="email-confirmed"
						element={<EmailSuccessfullyConfirmedPage />}
					/>
					<Route
						path="email-confirmation-required"
						element={<EmailConfirmationRequired />}
					/>

					<Route
						path="/messenger"
						element={
							<PrivateRoute>
								<MessengerPage />
							</PrivateRoute>
						}
					/>

					<Route path="/search/posts" element={<SearchPostsByTagPage />} />
					<Route path="/search/friends" element={<FriendsSearchPage />} />
					<Route
						path="memories"
						element={
							<PrivateRoute>
								<MemoriesPage />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route
					path="account-deleted-successfully"
					element={<AccountDeletedSuccessfullyPage />}
				/>
			</Routes>
		</ConfigProvider>
	);
};

export default App;
