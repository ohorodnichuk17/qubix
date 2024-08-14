import { Flex, Avatar, Button, Popconfirm } from "antd";
import { NavLink } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import { avatar } from "../../../../utils/images";
import type { IComment } from "../types";
import ChildCommentItem from "./ChildCommentItem";
import { useState } from "react";
import AddCommentReplyForm from "./AddCommentReplyForm";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";

type CommentItemProps = {
	comment: IComment;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
};

const CommentItem = ({ comment, setComments }: CommentItemProps) => {
	const { user } = useAppSelector((state) => state.account);
	const [answerVisibility, setAnswerVisibility] = useState<boolean>(false);

	if (comment.parentCommentId !== null) {
		return null;
	}

	const deleteComment = () => {
		const data = {
			id: comment.id,
		};
		apiClient.delete("api/comment", { data }).then(() => {
			setComments((prevComments) =>
				prevComments.filter(
					(commentFromList) => commentFromList.id !== comment.id,
				),
			);
		});
	};

	return (
		<>
			<Flex gap="small" align="start">
				<NavLink
					to={`profile?userId=${comment.userId}`}
					style={{ height: "fit-content" }}
				>
					<Avatar
						size={45}
						src={
							comment.userEntity.avatar === null
								? avatar
								: `${APP_ENV.BASE_URL}/images/avatars/${comment.userEntity.avatar}`
						}
					/>
				</NavLink>
				<Flex vertical style={{ width: "100%" }}>
					<Flex
						vertical
						style={{
							backgroundColor: "#f0f2f5",
							borderRadius: 8,
							padding: 5,
							width: "100%",
						}}
					>
						<span
							style={{ fontWeight: 500 }}
						>{`${comment.userEntity.firstName} ${comment.userEntity.lastName}`}</span>
						<span> {comment.message}</span>
					</Flex>
					{!answerVisibility && (
						<Button
							type="text"
							style={{
								color: "blue",
								padding: "0 2.5px",
								height: "fit-content",
								width: "fit-content",
							}}
							onClick={() => setAnswerVisibility(true)}
						>
							Answer
						</Button>
					)}
				</Flex>
				{comment.userId === user?.id && (
					<Popconfirm
						title="Delete comment ?"
						onConfirm={deleteComment}
						okText="Yes"
						cancelText="No"
					>
						<CloseCircleTwoTone className="delete-comment-icon" />
					</Popconfirm>
				)}
			</Flex>
			{answerVisibility && (
				<AddCommentReplyForm
					comment={comment}
					setComments={setComments}
					setAnswerVisibility={setAnswerVisibility}
				/>
			)}
			{comment.childComments.map((comment) => (
				<ChildCommentItem
					key={comment.id}
					comment={comment}
					setComments={setComments}
				/>
			))}
		</>
	);
};

export default CommentItem;