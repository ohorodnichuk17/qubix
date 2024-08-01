import type { IComment } from "../types";
import { Flex } from "antd";
import CommentItem from "./CommentItem";

type CommentsListProps = {
	comments: IComment[];
};

const CommentsList = ({ comments }: CommentsListProps) => {
	return (
		<Flex vertical gap="small" style={{ overflowY: "auto", maxHeight: 250 }}>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</Flex>
	);
};

export default CommentsList;