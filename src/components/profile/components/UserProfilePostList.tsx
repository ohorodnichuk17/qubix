import type React from "react";
import type { IPost } from "../../post/list/types";
import PostItemCard from "../../post/list/components/PostItemCard";

type UserProfilePostListProps = {
	posts: IPost[];
	setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
};

const UserProfilePostList = ({ posts, setPosts }: UserProfilePostListProps) => {
	if (posts.length <= 0) {
		return null;
	}

	return (
		<>
			<div style={{ columns: "300px" }}>
				{posts.map((post) => (
					<div key={post.id} style={{ breakInside: "avoid", marginBottom: 10 }}>
						<PostItemCard post={post} setPosts={setPosts} />
					</div>
				))}
			</div>
		</>
	);
};

export default UserProfilePostList;
