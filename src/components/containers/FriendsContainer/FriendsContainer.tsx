import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderDefault from "../Header/HeaderDefault";
import "../ContainerDefault/ContainerDefault.css";
import FriendSidebar from "../FriendSideBar/FriendSidebar";

const FriendsContainer = () => {
	return (
		<Layout className="container-default">
			<HeaderDefault />
			<Layout>
				<FriendSidebar />
				<Content
					className="main-content"
					style={{ maxHeight: "100vh", overflowY: "auto",padding:20 }}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default FriendsContainer;