import { Row } from "antd";
import type { IPost } from "../../../post/list/types";
import UserProfilePostItem from "./UserProfilePostItem";

type UserProfilePostListProps = {
	posts: IPost[];
};

const UserProfilePostList = ({ posts }: UserProfilePostListProps) => {
	if (posts.length <= 0) {
		return null;
	}

	return (
		<>
			<Row gutter={[16, 16]}>
				{posts.map((post) => (
					<UserProfilePostItem key={post.id} post={post} />
				))}
			</Row>
		</>
	);
};

export default UserProfilePostList;