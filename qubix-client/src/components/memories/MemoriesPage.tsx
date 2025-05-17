import { Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { apiClient } from "../../utils/api/apiClient";
import { tetraHomeHeader } from "../../utils/images";
import type { IStory } from "../story/list/types";
import StoryCard from "./components/StoryCard";

const MemoriesPage = () => {
	const { user } = useAppSelector((state) => state.account);
	const [stories, setStories] = useState<IStory[]>([]);

	useEffect(() => {
		apiClient
			.get(`api/user-profile/getStoriesBy/${user?.id}`)
			.then((res) => {
				setStories(res.data);
			})
			.catch(() => {
				message.error("Error fetching stories");
			});
	}, [user]);

	if (stories.length === 0) {
		return (
			<Row
				justify="center"
				align="middle"
				style={{ height: "100vh", textAlign: "center" }}
			>
				<Col>
					<img
						src={tetraHomeHeader}
						alt="No memories"
						style={{ width: "200px" }}
					/>
					<h2>No memories today</h2>
					<p>
						There are no memories for you today. We'll let you know when they
						appear.
					</p>
				</Col>
			</Row>
		);
	}

	return (
		<Row
			gutter={[16, 16]}
			style={{
				width: "100%",
				maxWidth: 800,
				padding: "20px",
				overflowY: "auto",
			}}
		>
			{stories.map((story) => (
				<Col span={24} key={story.id}>
					<StoryCard story={story} />
				</Col>
			))}
		</Row>
	);
};

export default MemoriesPage;
