import { Flex } from "antd";
import type { IComment } from "../types";
import CommentItem from "./CommentItem";

type CommentsListProps = {
	comments: IComment[];
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
};

const CommentsList = ({ comments, setComments }: CommentsListProps) => {
	return (
		<Flex vertical gap="small" style={{ overflowY: "auto", maxHeight: 250 }}>
			{comments.map((comment) => (
				<CommentItem
					key={comment.id}
					comment={comment}
					setComments={setComments}
				/>
			))}
		</Flex>
	);
};

export default CommentsList;
