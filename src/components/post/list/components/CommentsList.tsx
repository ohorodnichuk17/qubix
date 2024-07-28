import { useEffect, useState } from "react";
import type { IComment } from "../types";
import { apiClient } from "../../../../utils/api/apiClient";
import { Flex } from "antd";
import CommentItem from "./CommentItem";

type CommentsListProps = {
	postId: string;
};

const CommentsList = ({ postId }: CommentsListProps) => {
	const [comments, setComments] = useState<IComment[]>([]);

	useEffect(() => {
		apiClient.get(`api/comment/${postId}`).then((res) => {
			setComments(res.data);
		});
	}, [postId]);

	return (
		<Flex vertical gap="small" style={{ overflowY: "auto", maxHeight: 250 }}>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</Flex>
	);
};

export default CommentsList;