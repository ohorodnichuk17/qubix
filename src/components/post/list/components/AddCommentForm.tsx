import { Flex, Avatar, Input, Button } from "antd";
import useAvatar from "../../../../hooks/useAvatar";
import type { IComment, IPost } from "../types";
import { apiClient } from "../../../../utils/api/apiClient";
import { useAppSelector } from "../../../../hooks/redux";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { SmileTwoTone } from "@ant-design/icons";

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
			<Avatar
				size={45}
				src={avatarImg}
				style={{ minHeight: 45, minWidth: 45 }}
			/>
			<Flex vertical align="end" gap={3} style={{ width: "100%" }}>
				<Flex style={{ width: "100%" }}>
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
