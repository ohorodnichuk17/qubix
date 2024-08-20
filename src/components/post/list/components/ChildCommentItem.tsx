import { Flex, Avatar, Popconfirm } from "antd";
import { NavLink } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import type { IComment } from "../types";
import { avatar } from "../../../../utils/images";
import { useAppSelector } from "../../../../hooks/redux";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { apiClient } from "../../../../utils/api/apiClient";

type ChildCommentItemProps = {
	comment: IComment;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
};

const ChildCommentItem = ({ comment, setComments }: ChildCommentItemProps) => {
	const { user } = useAppSelector((state) => state.account);
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
				<span
					style={{ fontWeight: 500 }}
				>{`${comment.userEntity.firstName} ${comment.userEntity.lastName}`}</span>
				<span> {comment.message}</span>
			</Flex>
			{comment.userId === user?.id && (
				<Popconfirm
					title="Delete comment ?"
					onConfirm={deleteComment}
					okText="Yes"
					cancelText="No"
				>
					<CloseCircleTwoTone
						className="delete-comment-icon"
						style={{ top: -15 }}
					/>
				</Popconfirm>
			)}
		</Flex>
	);
};

export default ChildCommentItem;