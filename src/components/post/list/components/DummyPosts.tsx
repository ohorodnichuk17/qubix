import { Avatar, Card, Carousel, Divider, Flex } from "antd";
import { useId } from "react";
import { avatarImg } from "../../../../utils/images";
import { dummy } from "../../../../utils/images";
import Arrow from "../../../featured/arrow/Arrow";
import './DummyPosts.css';

const dummyPosts = [
	{
		id: "1",
		user: {
			id: "0",
			firstName: "Qubix Team",
			lastName: "",
			avatar: avatarImg,
		},
		content:
			"Welcome to Qubix! We are excited to have you here. Explore the platform, connect with friends, and share your experiences.",
		images: [dummy],
		createdAt: new Date().toISOString(),
	},
	{
		id: "2",
		user: {
			id: "0",
			firstName: "Qubix Team",
			lastName: "",
			avatar: avatarImg,
		},
		content:
			"Discover new communities and interests. Follow hashtags and people to see content you care about.",
		images: [dummy],
		createdAt: new Date().toISOString(),
	},
	{
		id: "3",
		user: {
			id: "0",
			firstName: "Qubix Team",
			lastName: "",
			avatar: avatarImg,
		},
		content:
			"Share your thoughts, experiences, and ideas with the Qubix community. Create posts, comment on others' posts, and join in the conversation.",
		images: [dummy],
		createdAt: new Date().toISOString(),
	},
];

const DummyPosts = () => {
	return (
		<div className="post-container">
			{dummyPosts.map((post) => (
				<Card
					key={post.id}
					className="post-card"
					bodyStyle={{ padding: "10px" }}
				>
					<Flex align="center" gap="small">
						<Avatar size={40} src={post.user.avatar} />
						<span className="post-user-name">
							{post.user.firstName}
						</span>
					</Flex>
					<Divider style={{ margin: "10px 0" }} />
					<p className="post-content">{post.content}</p>
					{post.images.length > 0 && (
						<Carousel
							arrows
							draggable
							infinite
							nextArrow={<Arrow direction="right" />}
							prevArrow={<Arrow direction="left" />}
							className="post-carousel"
						>
							{post.images.map((image, index) => (
								<div key={useId()} className="carousel-image-container">
									<img
										src={image}
										alt={`Post Image ${index + 1}`}
										className="carousel-image"
									/>
								</div>
							))}
						</Carousel>
					)}
				</Card>
			))}
		</div>
	);
};

export default DummyPosts;
