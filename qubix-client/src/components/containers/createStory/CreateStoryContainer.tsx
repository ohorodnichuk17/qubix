import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderDefault from "../default/Header/HeaderDefault";

const CreateStoryContainer = () => (
	<Layout className="container-default">
		<HeaderDefault />
		<Layout>
			<Content style={{ height: "100%", overflowY: "auto" }}>
				<Outlet />
			</Content>
		</Layout>
	</Layout>
);

export default CreateStoryContainer;
