import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderDefault from "../Header/HeaderDefault";
import "./ContainerDefault.css";
import SideBar from "../SideBar/SideBar";

const ContainerDefault = () => {
	return (
		<Layout className="container-default">
			<HeaderDefault />
			<Layout>
				<SideBar />
				<Content
					className="main-content"
					style={{ maxHeight: "100vh", overflowY: "auto" }}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default ContainerDefault;