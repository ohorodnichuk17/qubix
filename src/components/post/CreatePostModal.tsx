import {
	Button,
	Card,
	Divider,
	Flex,
	Form,
	Input,
	Modal,
	type RadioChangeEvent,
	Tag,
	Upload,
	message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import type { FileType } from "../../types/FileType";
import type { IUploadedFile } from "../../types/IUploadedFile";
import { apiClient } from "../../utils/api/apiClient";
import { getBase64 } from "../../utils/helpers/getBase64";
import {
	happyFeelingImg,
	locationImg,
	photoImg,
	planetImg,
	postTypeImg,
	tagImg,
} from "../../utils/images";
import FeelingModal from "../feelings/FeelingModal";
import type { IFeeling } from "../feelings/types";
import BackgroundOptions from "../pages/Story/CreateStoryPage/components/BackgroundOptions";
import useCapture from "../pages/Story/CreateStoryPage/hooks/useCapture";
import AddToThePublicationButton from "./components/AddToThePublicationButton/AddToThePublicationButton";
import PublicationAudienceModal from "./components/PublicationAudienceModal/PublicationAudienceModal";
import type { ICreatePost, PostType } from "./types";
import { TAG_COLORS } from "./constants";

type CreatePostModalProps = {
	isModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
};

const getRandomTagColor = () =>
	TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];

const CreatePostModal = ({
	isModalOpen,
	handleOk,
	handleCancel,
}: CreatePostModalProps) => {
	const { user } = useAppSelector((state) => state.account);

	const [postType, setPostType] = useState<PostType>("image");

	const [background, setBackground] = useState<string>("gray");
	const { captureAreaRef, getCapture } = useCapture();

	const [previewImage, setPreviewImage] = useState<string>("");
	const [showLocationInput, setShowLocationInput] = useState<boolean>(false);

	const [showTagsInput, setShowTagsInput] = useState<boolean>(false);
	const [tags, setTags] = useState<string[]>([]);
	const [newTag, setNewTag] = useState<string>("");

	const addTag = () => {
		if (newTag && !tags.includes(newTag)) {
			setTags([...tags, newTag]);
			setNewTag("");
		}
	};

	const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

	const [audienceModalVisible, setAudienceModalVisible] =
		useState<boolean>(false);
	const [audience, setAudience] = useState<string>("Public");

	const [feeling, setFeeling] = useState<IFeeling>();
	const [feelingModalVisible, setFeelingModalVisible] =
		useState<boolean>(false);

	const handleFeelingModalOk = (newFeeling: IFeeling | undefined) => {
		setFeeling(newFeeling);
		setFeelingModalVisible(false);
	};

	const handleAudienceChange = (e: RadioChangeEvent) =>
		setAudience(e.target.value);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
	};

	const handleAvatarChange = async (info: UploadChangeParam<UploadFile>) => {
		const file = info.fileList[0];
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
	};

	const onFinish = async (values: ICreatePost) => {
		console.log(user?.id);
		console.log(values);

		values.isArchive = false;
		values.tags = tags;

		if (postType === "text") {
			const postImage = await getCapture(postType, false);
			values.images = postImage as Blob;
		}

		if (feeling && feeling.id !== undefined) {
			values.feelingId = feeling.id;
		}

		apiClient
			.post("/api/Post/create", values, {
				headers: {
					"content-type": "multipart/form-data",
				},
			})
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
		<Modal
			title="Create publication"
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<Flex align="center" gap="middle">
				<img
					src={`http://localhost:5181${user?.avatar}`}
					style={{ height: 92, width: 92 }}
					alt="User avatar"
				/>
				<Flex vertical gap="small">
					<p
						style={{
							whiteSpace: "nowrap",
							color: "black",
							fontWeight: 700,
							margin: 0,
						}}
					>
						{`${user?.firstName} ${user?.lastName}`}
					</p>
					{feeling && (
						<Flex gap="small" align="center">
							<img
								src={feeling.emoji}
								alt="Feeling emoji"
								style={{ height: 30, width: 30 }}
							/>
							<span>{feeling.name}</span>
						</Flex>
					)}
					<button
						type="button"
						style={{
							border: "none",
							borderRadius: 8,
							padding: "5px 10px",
							cursor: "pointer",
						}}
						onClick={() => setAudienceModalVisible(true)}
					>
						<Flex align="center" gap="small">
							<img
								src={planetImg}
								style={{ height: 15, width: 15 }}
								alt="Audience icon (planet)"
							/>
							<p style={{ margin: 0 }}>Available to everyone</p>
						</Flex>
					</button>
				</Flex>
			</Flex>
			<Divider />
			<Form onFinish={onFinish} layout="vertical" requiredMark={false}>
				<FormItem name="userId" hidden initialValue={user?.id} />
				<div ref={captureAreaRef}>
					<FormItem name="content">
						<Input.TextArea
							placeholder={`What's up, ${`${user?.firstName} ${user?.lastName}`}?`}
							style={{
								minHeight: 150,
								background: postType === "text" ? background : "white",
								color: postType === "text" ? "white" : "black",
								textAlign: postType === "text" ? "center" : "start",
							}}
						/>
					</FormItem>
				</div>

				{postType === "text" && (
					<BackgroundOptions setBackground={setBackground} />
				)}

				{showLocationInput && (
					<Form.Item name="location" label="Location">
						<Input placeholder="Enter your location" />
					</Form.Item>
				)}

				<Flex vertical gap="middle">
					{showTagsInput && (
						<Flex gap="small">
							<Input
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								placeholder="Enter tag"
							/>
							<Button type="primary" onClick={addTag}>
								Add
							</Button>
						</Flex>
					)}
					{tags.length !== 0 && (
						<Flex wrap="wrap" gap="small">
							{tags.map((tag) => (
								<Tag
									key={tag}
									closable
									onClose={() => removeTag(tag)}
									color={getRandomTagColor()}
									style={{ margin: 0 }}
								>
									{tag}
								</Tag>
							))}
						</Flex>
					)}
				</Flex>
				{postType === "image" && previewImage && (
					<>
						<Divider />
						<img
							src={previewImage}
							style={{ width: "100%" }}
							alt="Post images"
						/>
						<Divider />
					</>
				)}
				<AddToThePublicationButton
					tooltioTitle="Change post type"
					onClick={() => setPostType(postType === "image" ? "text" : "image")}
					imgSrc={postTypeImg}
					imgAlt="Change post type icon"
					imgStyle={{
						boxShadow: "0px 4px 4px 0px #00000040",
					}}
				/>

				<Card title="Add to the publication">
					<Flex>
						{postType === "image" && (
							<Form.Item
								name="images"
								valuePropName="image"
								getValueFromEvent={(e: UploadChangeParam) => {
									const image = e?.fileList[0] as IUploadedFile;
									return image?.originFileObj;
								}}
							>
								<Upload
									showUploadList={false}
									beforeUpload={() => false}
									defaultFileList={[]}
									accept="image/*"
									onChange={handleAvatarChange}
									onPreview={handlePreview}
									maxCount={1}
								>
									<AddToThePublicationButton
										tooltioTitle="Image"
										imgSrc={photoImg}
										imgAlt="Add images icon (camera)"
									/>
								</Upload>
							</Form.Item>
						)}
						<AddToThePublicationButton
							tooltioTitle="Location"
							onClick={() => setShowLocationInput(!showLocationInput)}
							imgSrc={locationImg}
							imgAlt="location icon"
						/>
						<AddToThePublicationButton
							tooltioTitle="#"
							onClick={() => setShowTagsInput(!showTagsInput)}
							imgSrc={tagImg}
							imgAlt="Add tags icon"
						/>
						<AddToThePublicationButton
							tooltioTitle="Feeling"
							onClick={() => setFeelingModalVisible(!feelingModalVisible)}
							imgSrc={feeling ? feeling.emoji : happyFeelingImg}
							imgAlt="Change feeling icon (happy smile)"
						/>
					</Flex>
				</Card>

				<Button htmlType="submit">Post</Button>
			</Form>
			<PublicationAudienceModal
				audience={audience}
				audienceModalVisible={audienceModalVisible}
				setAudienceModalVisible={setAudienceModalVisible}
				handleAudienceChange={handleAudienceChange}
			/>
			<FeelingModal
				isModalOpen={feelingModalVisible}
				handleOk={handleFeelingModalOk}
				handleCancel={() => {
					setFeelingModalVisible(false);
				}}
			/>
		</Modal>
	);
};

export default CreatePostModal;
