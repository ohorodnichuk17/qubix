import { Layout } from "antd";
import StorySettingsCard from "./StorySettingsCard";

const { Sider } = Layout;

type CreateStorySideBarProps = {
	postStory: () => Promise<void>;
};

const CreateStorySideBar = ({ postStory }: CreateStorySideBarProps) => {
	return (
		<Sider
			width="35vw"
			style={{
				background: "#fff",
				height: "100%",
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
