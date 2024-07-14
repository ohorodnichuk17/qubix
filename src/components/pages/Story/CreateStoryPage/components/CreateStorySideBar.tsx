import { Layout } from "antd";
import StorySettingsCard from "./StorySettingsCard";

const { Sider } = Layout;

type CreateStorySideBarProps = {
	postStory: () => Promise<void>;
};

const CreateStorySideBar = ({ postStory }: CreateStorySideBarProps) => {
	return (
		<Sider
			width="35%"
			style={{
				background: "#fff",
				height: "calc(100vh - 64px)",
				position: "fixed",
				left: 0,
				top: 64,
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
				overflowY: "auto",
			}}
			className="sider"
		>
			<StorySettingsCard postStory={postStory} />
		</Sider>
	);
};

export default CreateStorySideBar;
