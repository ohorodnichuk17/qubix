import { SmileTwoTone } from "@ant-design/icons";
import { Avatar, Button, Flex, Input, message as antdMessage } from "antd";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useState } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import useAvatar from "../../../../hooks/useAvatar";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IComment } from "../types";

type EditCommentFormProps = {
	comment: IComment;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
	setEditCommentVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCommentForm: React.FC<EditCommentFormProps> = ({
	comment,
	setComments,
	setEditCommentVisibility,
}) => {
	const { user } = useAppSelector((state) => state.account);
	const avatarImg = useAvatar();

	const [message, setMessage] = useState<string>(comment.message);
	const [showPicker, setShowPicker] = useState<boolean>(false);

	const onEmojiClick = (event: EmojiClickData) => {
		setMessage((prevInput) => prevInput + event.emoji);
		setShowPicker(false);
	};

	const saveComment = () => {
		try {
			apiClient.put("api/comment", { id: comment.id, message });
			const updatedComment = { ...comment, message: message };

			updateCommentInList(updatedComment);

			if (comment.parentCommentId !== null) {
				updateParentCommentWithChild(updatedComment);
			}

			setEditCommentVisibility(false);
		} catch {
			antdMessage.error("Comment edit error try later");
		}
	};

	const updateCommentInList = (updatedComment: IComment) => {
		setComments((prevComments) =>
			prevComments.map((commentFromList) =>
				commentFromList.id === updatedComment.id
					? updatedComment
					: commentFromList,
			),
		);
	};

	const updateParentCommentWithChild = (updatedComment: IComment) => {
		setComments((prevComments) =>
			prevComments.map((parentComment) =>
				parentComment.childComments.some(
					(child) => child.id === updatedComment.id,
				)
					? {
							...parentComment,
							childComments: parentComment.childComments.map((child) =>
								child.id !== updatedComment.id ? child : updatedComment,
							),
						}
					: parentComment,
			),
		);
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
				<Flex>
					<Button
						className="gray-button"
						onClick={() => {
							setMessage(comment.message);
							setEditCommentVisibility(false);
						}}
					>
						Cancel
					</Button>
					<Button style={{ width: "fit-content" }} onClick={saveComment}>
						Save
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default EditCommentForm;
