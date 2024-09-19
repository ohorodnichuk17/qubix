import { Col } from "antd";
import PostItemCard from "../../post/list/components/PostItemCard";
import type { IPost } from "../../post/list/types";

type UserProfilePostItemProps = {
	post: IPost;
	setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
};

const UserProfilePostItem: React.FC<UserProfilePostItemProps> = ({
	post,
	setPosts,
}) => (
	<Col key={post.id}>
		<div style={{ width: "100%", height: "auto" }}>
			<PostItemCard key={post.id} post={post} setPosts={setPosts} />
		</div>
	</Col>
);

export default UserProfilePostItem;
