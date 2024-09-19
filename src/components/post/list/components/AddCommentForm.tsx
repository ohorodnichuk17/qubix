import { SmileTwoTone } from "@ant-design/icons";
import { Avatar, Button, Flex, Input } from "antd";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import useAvatar from "../../../../hooks/useAvatar";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IComment, IPost } from "../types";

type AddCommentFormProps = {
	post: IPost;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
};

const AddCommentForm = ({ post, setComments }: AddCommentFormProps) => {
	const { user } = useAppSelector((state) => state.account);
	const [message, setMessage] = useState<string>("");
	const [showPicker, setShowPicker] = useState<boolean>(false);

	const avatarImg = useAvatar();

	const postComment = () => {
		const formData = {
			postId: post.id,
			message,
		};

		apiClient
			.post<IComment>("api/comment/add", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				setMessage("");
				setComments((prevComments) => [...prevComments, res.data]);
			})
			.catch(() => {
				// message.error("error");
			});
	};

	const onEmojiClick = (event: EmojiClickData) => {
		setMessage((prevInput) => prevInput + event.emoji);
		setShowPicker(false);
	};

	return (
		<Flex style={{ width: "100%" }} gap={5}>
			<Flex vertical align="end" gap={3} style={{ width: "100%", display: "flex", alignItems: "center" }}>
				<Flex style={{ width: "100%" }}>
					<Avatar
						size={45}
						src={avatarImg}
						style={{ minHeight: 45, minWidth: 45 }}
					/>
					<Input.TextArea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						style={{ width: "100%" }}
						placeholder={`Comment as ${user?.firstName} ${user?.lastName}`}
					/>
					<SmileTwoTone
						onClick={() => {
							setShowPicker(!showPicker);
						}}
						style={{ fontSize: 30 }}
					/>
				</Flex>
				<EmojiPicker open={showPicker} onEmojiClick={onEmojiClick} />
				<Button style={{ width: "fit-content" }} onClick={postComment}>
					Comment
				</Button>
			</Flex>
		</Flex>
	);
};

export default AddCommentForm;
