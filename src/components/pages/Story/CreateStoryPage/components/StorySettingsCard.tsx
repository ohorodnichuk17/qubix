import { Button, Card, Flex } from "antd";
import type { ColorValueType } from "antd/es/color-picker/interface";
import { APP_ENV } from "../../../../../env";
import { useAppSelector } from "../../../../../hooks/redux";
import { avatar, settingsIcon } from "../../../../../utils/images";
import type { StoryType } from "../types";
import BackgroundSelect from "./BackgroundSelect";
import ImageStorySettings from "./ImageStorySettings";
import TextSettingsCollapce from "./TextSettingsCollapce";

type StorySettingsCardProps = {
	isSmallerThatMdScreen?: boolean;
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

const StorySettingsCard = ({
	isSmallerThatMdScreen = false,
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
}: StorySettingsCardProps) => {
	const { user } = useAppSelector((state) => state.account);

	const avatarImg =
		user?.avatar && user.avatar !== "/images/avatars/"
			? `${APP_ENV.BASE_URL}${user.avatar}`
			: avatar;

	return (
		<Card style={{ height: isSmallerThatMdScreen ? "fit-content" : "100%" }}>
			<Flex style={{ height: "100%" }} vertical justify="space-between">
				<Flex vertical>
					<Card>
						<Flex justify="space-between" align="center">
							<p>Your story</p>
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div className="settings-icon-div" onClick={showPrivacyModal}>
								<img src={settingsIcon} alt="Settings icon" />
							</div>
						</Flex>
						<Flex className="avatar-div" gap="middle">
							<img src={avatarImg} alt="User avatar" />
							<p style={{ whiteSpace: "nowrap" }}>
								{`${user?.firstName} ${user?.lastName}`}
							</p>
						</Flex>
					</Card>

					{storyType != null && (
						<Flex vertical gap="small">
							{storyType === "image" && (
								<ImageStorySettings
									setImage={setImage}
									handleImageWidthChange={handleImageWidthChange}
									handleImageRotateChange={handleImageRotateChange}
								/>
							)}
							<TextSettingsCollapce
								setText={setText}
								textFontSize={textFontSize}
								setTextFontSize={setTextFontSize}
								textColor={textColor}
								setTextColor={setTextColor}
							/>
							<BackgroundSelect setBackground={setBackground} />
						</Flex>
					)}
				</Flex>

				{storyType != null && (
					<Flex gap="small" className="story-buttons-div">
						<Button className="gray-button" onClick={showCancelModal}>
							Cancel
						</Button>
						<Button onClick={postStory}>Share</Button>
					</Flex>
				)}
			</Flex>
		</Card>
	);
};

export default StorySettingsCard;
