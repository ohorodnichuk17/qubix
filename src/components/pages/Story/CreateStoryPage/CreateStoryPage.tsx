import { Button, Card, type ColorPickerProps, Flex, message } from "antd";
import { useMemo, useState } from "react";
import "./CreateStoryPage.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import { settingsIcon } from "../../../../utils/images";
import BackgroundSelect from "./components/BackgroundSelect";
import CancelStoryModal from "./components/CancelStoryModal";
import ImageStorySettings from "./components/ImageStorySettings";
import SelectStoryType from "./components/SelectStoryType";
import StoryPreview from "./components/StoryPreview";
import StoryPrivacyModal from "./components/StoryPrivacyModal";
import TextSettingsCollapce from "./components/TextSettingsCollapce";
import useCapture from "./hooks/useCapture";
import type { StoryType } from "./types";

export const CreateStoryPage = () => {
	const navigate = useNavigate();

	const account = useAppSelector((state) => state.account);

	const [storyType, setStoryType] = useState<StoryType | null>(null);
	const [image, setImage] = useState<string>();
	const [text, setText] = useState<string>();
	const [textFontSize, setTextFontSize] = useState<string>("16");

	const [textColor, setTextColor] =
		useState<ColorPickerProps["value"]>("black");
	const textColorString = useMemo(
		() =>
			typeof textColor === "string" ? textColor : textColor?.toHexString(),
		[textColor],
	);

	const [background, setBackground] = useState<string>("gray");

	const [width, setWidth] = useState<number>(30);
	const [rotate, setRotate] = useState<number>(0);

	const { captureAreaRef, getCapture } = useCapture();

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

	const handleImageWidthChange = (value: number) => setWidth(value);
	const handleImageRotateChange = (value: number) => setRotate(value);

	const postStory = async () => {
		if (storyType == null) return;
		const story = await getCapture(storyType);

		const formData = new FormData();
		formData.append("Content", text ?? "");
		formData.append("Image", story as Blob);
		formData.append("UserId", account.user?.id ?? "");

		apiClient
			.post("/api/story/create", formData)
			.then((res) => {
				console.log(res);
				message.success("Story successfully posted!");
			})
			.catch((error) => {
				console.log(error);
				message.error("Post story error!");
			});
	};

	return (
		<Flex gap="middle" className="create-story-page">
			<Card style={{ height: "100%" }}>
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
							<Flex className="avatar-div">
								<img
									src={`http://localhost:5181${account.user?.avatar}`}
									alt="User avatar"
								/>
								<p style={{ whiteSpace: "nowrap" }}>
									{`${account.user?.firstName} ${account.user?.lastName}`}
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

			{storyType == null && <SelectStoryType setStoryType={setStoryType} />}

			{storyType != null && (
				<StoryPreview
					storyType={storyType}
					image={image}
					text={text}
					textFontSize={textFontSize}
					textColorString={textColorString}
					background={background}
					width={width}
					rotate={rotate}
					captureAreaRef={captureAreaRef}
				/>
			)}
			<StoryPrivacyModal
				isModalOpen={isPrivacyModalOpen}
				hideModal={hidePrivacyModal}
			/>
			<CancelStoryModal
				isCancelModalOpen={isCancelModalOpen}
				onOkCancelModal={onOkCancelModal}
				onCancelCancelModal={onCancelCancelModal}
			/>
		</Flex>
	);
};
