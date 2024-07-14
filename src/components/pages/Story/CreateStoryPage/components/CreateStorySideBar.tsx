import { Layout } from "antd";
import type { ColorValueType } from "antd/es/color-picker/interface";
import type { StoryType } from "../types";
import StorySettingsCard from "./StorySettingsCard";

const { Sider } = Layout;

type CreateStorySideBarProps = {
	storyType: StoryType | null;
	setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
	setText: React.Dispatch<React.SetStateAction<string | undefined>>;
	textFontSize: string;
	setTextFontSize: React.Dispatch<React.SetStateAction<string>>;
	setTextColor: React.Dispatch<
		React.SetStateAction<ColorValueType | undefined>
	>;
	setBackground: React.Dispatch<React.SetStateAction<string>>;
	showPrivacyModal: () => void;
	showCancelModal: () => void;
	handleImageWidthChange: (value: number) => void;
	handleImageRotateChange: (value: number) => void;
	postStory: () => Promise<void>;
	textColor: ColorValueType | undefined;
};

export const CreateStorySideBar = ({
	storyType,
	setImage,
	setText,
	textFontSize,
	setTextFontSize,
	setTextColor,
	setBackground,
	showPrivacyModal,
	showCancelModal,
	handleImageWidthChange,
	handleImageRotateChange,
	postStory,
	textColor,
}: CreateStorySideBarProps) => {
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
			<StorySettingsCard
				setImage={setImage}
				setBackground={setBackground}
				setText={setText}
				setTextFontSize={setTextFontSize}
				setTextColor={setTextColor}
				showPrivacyModal={showPrivacyModal}
				showCancelModal={showCancelModal}
				handleImageRotateChange={handleImageRotateChange}
				handleImageWidthChange={handleImageWidthChange}
				postStory={postStory}
				storyType={storyType}
				textFontSize={textFontSize}
				textColor={textColor}
			/>
		</Sider>
	);
};

export default CreateStorySideBar;
