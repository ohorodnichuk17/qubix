import { Avatar, Card, Carousel, Divider, Flex } from "antd";
import { useId } from "react";
import { avatarImg } from "../../../../utils/images";
import { dummy } from "../../../../utils/images";
import Arrow from "../../../featured/Arrow/Arrow";

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
		<>
			{dummyPosts.map((post) => (
				<Card
					key={post.id}
					style={{ width: "600px", marginBottom: 16, padding: 10 }}
					bodyStyle={{ padding: "10px" }}
				>
					<Flex align="center" gap="small">
						<Avatar size={40} src={post.user.avatar} />
						<span style={{ fontWeight: 600, fontSize: "16px" }}>
							{post.user.firstName}
						</span>
					</Flex>
					<Divider style={{ margin: "10px 0" }} />
					<p style={{ fontSize: "14px" }}>{post.content}</p>
					{post.images.length > 0 && (
						<Carousel
							arrows
							draggable
							infinite
							nextArrow={<Arrow direction="right" />}
							prevArrow={<Arrow direction="left" />}
							style={{ marginTop: "10px" }}
						>
							{post.images.map((image, index) => (
								<div key={useId()} style={{ width: "100%", height: "auto" }}>
									<img
										src={image}
										alt={`Post Image ${index + 1}`}
										style={{
											width: "100%",
											height: "auto",
											objectFit: "cover",
										}}
									/>
								</div>
							))}
						</Carousel>
					)}
				</Card>
			))}
		</>
	);
};

export default DummyPosts;
