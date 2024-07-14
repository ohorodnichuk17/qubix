import { type ColorPickerProps, Flex, Grid, Layout, message } from "antd";
import { useMemo, useState } from "react";
import "./CreateStoryPage.css";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import CancelStoryModal from "./components/CancelStoryModal";
import CreateStorySideBar from "./components/CreateStorySideBar";
import SelectStoryType from "./components/SelectStoryType";
import StoryPreview from "./components/StoryPreview";
import StoryPrivacyModal from "./components/StoryPrivacyModal";
import StorySettingsCard from "./components/StorySettingsCard";
import useCapture from "./hooks/useCapture";
import type { StoryType } from "./types";

export const CreateStoryPage = () => {
	const navigate = useNavigate();

	const { user } = useAppSelector((state) => state.account);

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
		formData.append("UserId", user?.id ?? "");

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

	const screens = Grid.useBreakpoint();

	const isScreenSmallerThatMd =
		(screens.xs || screens.sm) &&
		!screens.md &&
		!screens.lg &&
		!screens.xl &&
		!screens.xxl;

	return (
		<Layout className="create-page-story-layout" style={{ height: "100%" }}>
			{!isScreenSmallerThatMd && (
				<CreateStorySideBar
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
			)}
			<Content
				style={{
					marginLeft: !isScreenSmallerThatMd ? "35%" : 0,
				}}
				className="content"
			>
				{isScreenSmallerThatMd && (
					<StorySettingsCard
						isSmallerThatMdScreen={isScreenSmallerThatMd}
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
				)}
				<Flex
					gap="middle"
					className="create-story-page"
					style={{
						height: isScreenSmallerThatMd ? "fit-content" : "100%",
						marginTop: isScreenSmallerThatMd ? 20 : 0,
					}}
				>
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
			</Content>
		</Layout>
	);
};
