import { Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import SettingsSideBar from "./SettingsSideBar";
import HeaderDefault from "../Header/HeaderDefault";

const SettingsContainer = () => {
	return (
		<Layout style={{ height: "100vh" }}>
			<HeaderDefault />
			<Layout>
				<SettingsSideBar />
				<Content>
					<Flex
						justify="center"
						align="center"
						style={{ height: "100%", width: "100%" }}
					>
						<Outlet />
					</Flex>
				</Content>
			</Layout>
		</Layout>
	);
};

export default SettingsContainer;
