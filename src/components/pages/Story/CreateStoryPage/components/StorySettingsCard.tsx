import { Button, Card, Flex } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../../../env";
import { useAppSelector } from "../../../../../hooks/redux";
import { avatar, settingsIcon } from "../../../../../utils/images";
import { useCreateStory } from "../context";
import BackgroundSelect from "./BackgroundSelect";
import CancelStoryModal from "./CancelStoryModal";
import ImageStorySettings from "./ImageStorySettings";
import StoryPrivacyModal from "./StoryPrivacyModal";
import TextSettingsCollapce from "./TextSettingsCollapce";

type StorySettingsCardProps = {
	isSmallerThatMdScreen?: boolean;
	postStory: () => Promise<void>;
};

const StorySettingsCard = ({
	isSmallerThatMdScreen = false,
	postStory,
}: StorySettingsCardProps) => {
	const { user } = useAppSelector((state) => state.account);

	const {
		storyType,
		setImage,
		setText,
		textFontSize,
		setTextFontSize,
		textColor,
		setTextColor,
		setBackground,
		handleImageWidthChange,
		handleImageRotateChange,
	} = useCreateStory();

	const navigate = useNavigate();

	const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

	const showPrivacyModal = () => setIsPrivacyModalOpen(true);
	const hidePrivacyModal = () => setIsPrivacyModalOpen(false);

	const showCancelModal = () => setIsCancelModalOpen(true);
	const onCancelCancelModal = () => setIsCancelModalOpen(false);
	const onOkCancelModal = () => {
		setIsPrivacyModalOpen(false);
		navigate("/");
	};

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
			<StoryPrivacyModal
				isModalOpen={isPrivacyModalOpen}
				hideModal={hidePrivacyModal}
			/>
			<CancelStoryModal
				isCancelModalOpen={isCancelModalOpen}
				onOkCancelModal={onOkCancelModal}
				onCancelCancelModal={onCancelCancelModal}
			/>
		</Card>
	);
};

export default StorySettingsCard;
