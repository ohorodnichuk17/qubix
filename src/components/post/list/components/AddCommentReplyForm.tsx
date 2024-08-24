import { Flex, Avatar, Input, Button } from "antd";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IComment } from "../types";
import { useAppSelector } from "../../../../hooks/redux";
import useAvatar from "../../../../hooks/useAvatar";
import { useState } from "react";
import { SmileTwoTone } from "@ant-design/icons";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

type AddCommentReplyFormProps = {
	comment: IComment;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
	setAnswerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCommentReplyForm = ({
	comment,
	setComments,
	setAnswerVisibility,
}: AddCommentReplyFormProps) => {
	const { user } = useAppSelector((state) => state.account);
	const [message, setMessage] = useState<string>("");
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const avatarImg = useAvatar();

	const postComment = () => {
		const formData = {
			parentId: comment.id,
			message,
		};
		apiClient
			.post("api/comment/add-reply", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				setMessage("");

				const updatedComment = {
					...comment,
					childComments: [...comment.childComments, res.data],
				};
				setComments((prevComments) =>
					prevComments.map((c) => (c.id === comment.id ? updatedComment : c)),
				);
				setComments((prevComments) => [...prevComments, res.data]);
				setAnswerVisibility(false);
			})
			.catch(() => {
				// console.error(error);
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
				<Button onClick={postComment} style={{ width: "fit-content" }}>
					Comment
				</Button>
			</Flex>
		</Flex>
	);
};

export default AddCommentReplyForm;