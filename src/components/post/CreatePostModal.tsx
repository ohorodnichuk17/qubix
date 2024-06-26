import {
	Modal,
	Flex,
	Form,
	Input,
	Button,
	message,
	Card,
	Tooltip,
	Upload,
	Divider,
	Tag,
	type RadioChangeEvent,
} from "antd";
import { useAppSelector } from "../../hooks/redux";
import FormItem from "antd/es/form/FormItem";
import { apiClient } from "../../utils/api/apiClient";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import type { IUploadedFile } from "../../types/IUploadedFile";
import { useState } from "react";
import { getBase64 } from "../../utils/helpers/getBase64";
import type { FileType } from "../../types/FileType";
import PublicationAudienceModal from "./components/PublicationAudienceModal/PublicationAudienceModal";
import {
	planetImg,
	photoImg,
	locationImg,
	tagImg,
	postTypeImg,
} from "../../utils/images";
import type { ICreatePost } from "./types";
import BackgroundOptions from "../pages/Story/CreateStoryPage/components/BackgroundOptions";
import useCapture from "../pages/Story/CreateStoryPage/hooks/useCapture";

type CreatePostModalProps = {
	isModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
};

type PostType = "text" | "image";

const tagColors = ["success", "processing", "error", "default"];
const getRandomTagColor = () =>
	tagColors[Math.floor(Math.random() * tagColors.length)];

const CreatePostModal = ({
	isModalOpen,
	handleOk,
	handleCancel,
}: CreatePostModalProps) => {
	const account = useAppSelector((state) => state.account);

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

	const onFinish =async (values: ICreatePost) => {
		console.log(account.user?.id);
		console.log(values);
		
		values.isArchive = false;
		values.tags = tags;

		if(postType==="text"){
			const postImage = await getCapture(postType,false);
			values.images=postImage as Blob;
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
			<Flex align="center">
				<img
					src={`http://localhost:5181${account.user?.avatar}`}
					style={{ height: 92, width: 92 }}
					alt="User avatar"
				/>
				<Flex vertical>
					<p
						style={{
							whiteSpace: "nowrap",
							color: "black",
							fontWeight: 700,
							margin: 0,
						}}
					>
						{`${account.user?.firstName} ${account.user?.lastName}`}
					</p>
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
				<FormItem name="userId" hidden initialValue={account.user?.id} />
				<div ref={captureAreaRef}>
					<FormItem name="content">
						<Input.TextArea
							placeholder={`What's up, ${`${account.user?.firstName} ${account.user?.lastName}`}?`}
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

				<Tooltip title="Change post type">
					<button
						style={{
							border: 0,
							background: "none",
							cursor: "pointer",
							height: "fit-content",
						}}
						type="button"
						onClick={() => setPostType(postType === "image" ? "text" : "image")}
					>
						<img
							src={postTypeImg}
							className="h-50px"
							style={{
								boxShadow: "0px 4px 4px 0px #00000040",
							}}
							alt="Change post type icon"
						/>
					</button>
				</Tooltip>

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
									<Tooltip title="Image">
										<button
											style={{
												border: 0,
												background: "none",
												cursor: "pointer",
											}}
											type="button"
										>
											<img
												src={photoImg}
												className="h-50px"
												alt="Add images icon (camera)"
											/>
										</button>
									</Tooltip>
								</Upload>
							</Form.Item>
						)}

						<Tooltip title="Location">
							<button
								style={{
									border: 0,
									background: "none",
									cursor: "pointer",
									height: "fit-content",
								}}
								type="button"
								onClick={() => setShowLocationInput(!showLocationInput)}
							>
								<img
									src={locationImg}
									className="h-50px"
									alt="Add location icon"
								/>
							</button>
						</Tooltip>
						<Tooltip title="#">
							<button
								style={{
									border: 0,
									background: "none",
									cursor: "pointer",
									height: "fit-content",
								}}
								type="button"
								onClick={() => setShowTagsInput(!showTagsInput)}
							>
								<img src={tagImg} className="h-50px" alt="Add tags icon" />
							</button>
						</Tooltip>
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
		</Modal>
	);
};

export default CreatePostModal;
