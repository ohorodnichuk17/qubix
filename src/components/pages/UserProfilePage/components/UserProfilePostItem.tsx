import { Col } from "antd";
import PostItemCard from "../../../post/list/components/PostItemCard";
import type { IPost } from "../../../post/list/types";

type UserProfilePostItemProps = {
	post: IPost;
};

const UserProfilePostItem = ({ post }: UserProfilePostItemProps) => {
	return (
		<Col key={post.id} xs={24} sm={24} md={24} lg={8} xl={8}>
			<div style={{ width: "100%", height: "auto" }}>
				<PostItemCard key={post.id} post={post} />
			</div>
		</Col>
	);
};

export default UserProfilePostItem;