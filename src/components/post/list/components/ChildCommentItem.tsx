import { Flex, Avatar, Popconfirm } from "antd";
import { NavLink } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import type { IComment } from "../types";
import { avatar } from "../../../../utils/images";
import { useAppSelector } from "../../../../hooks/redux";
import { CloseCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import { apiClient } from "../../../../utils/api/apiClient";
import { useState } from "react";
import EditCommentForm from "./EditCommentForm";

type ChildCommentItemProps = {
	comment: IComment;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
};

const ChildCommentItem = ({ comment, setComments }: ChildCommentItemProps) => {
	const { user } = useAppSelector((state) => state.account);
	const [editCommentVisibility, setEditCommentVisibility] =
		useState<boolean>(false);

	const deleteComment = () => {
		const data = {
			id: comment.id,
		};
		apiClient.delete("api/comment", { data }).then(() => {
			setComments((prevComments) =>
				prevComments.map((parentComment) =>
					parentComment.childComments.some((child) => child.id === comment.id)
						? {
								...parentComment,
								childComments: parentComment.childComments.filter(
									(child) => child.id !== comment.id,
								),
							}
						: parentComment,
				),
			);
			setComments((prevComments) =>
				prevComments.filter(
					(commentFromList) => commentFromList.id !== comment.id,
				),
			);
		});
	};

	if (editCommentVisibility) {
		return (
			<EditCommentForm
				comment={comment}
				setComments={setComments}
				setEditCommentVisibility={setEditCommentVisibility}
			/>
		);
	}

	return (
		<Flex gap="small" style={{ marginLeft: 45 }}>
			<NavLink
				to={`profile?userId=${comment.userId}`}
				style={{ height: "fit-content" }}
			>
				<Avatar
					size={25}
					src={
						comment.userEntity.avatar === null
							? avatar
							: `${APP_ENV.BASE_URL}/images/avatars/${comment.userEntity.avatar}`
					}
				/>
			</NavLink>
			<Flex
				vertical
				style={{
					backgroundColor: "#f0f2f5",
					borderRadius: 8,
					padding: 5,
					width: "100%",
				}}
			>
				<Flex justify="space-between" align="center">
					<span
						style={{ fontWeight: 500 }}
					>{`${comment.userEntity.firstName} ${comment.userEntity.lastName}`}</span>
					{comment.userId === user?.id && (
						<Flex gap="small">
							<EditTwoTone
								className="comment-icon"
								onClick={() => setEditCommentVisibility(true)}
							/>
							<Popconfirm
								title="Delete comment ?"
								onConfirm={deleteComment}
								okText="Yes"
								cancelText="No"
							>
								<CloseCircleTwoTone className="comment-icon" />
							</Popconfirm>
						</Flex>
					)}
				</Flex>
				<span> {comment.message}</span>
			</Flex>
		</Flex>
	);
};

export default ChildCommentItem;
