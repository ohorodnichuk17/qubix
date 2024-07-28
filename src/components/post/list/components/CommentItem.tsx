import { Flex, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import { avatar } from "../../../../utils/images";
import type { IComment } from "../types";

type CommentItemProps = {
	comment: IComment;
};

const CommentItem = ({ comment }: CommentItemProps) => {
	return (
		<Flex key={comment.id} gap="small">
			<NavLink to={`profile?userId=${comment.userId}`}>
				<Avatar
					size={45}
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
		</Flex>
	);
};

export default CommentItem;