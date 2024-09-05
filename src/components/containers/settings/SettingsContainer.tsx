import { Flex, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderDefault from "../default/Header/HeaderDefault";
import SettingsSideBar from "./SettingsSideBar";

const SettingsContainer = () => (
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

export default SettingsContainer;
