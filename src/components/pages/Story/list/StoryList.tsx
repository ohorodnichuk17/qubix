import { useEffect, useState } from "react";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IStory } from "./types";
import { Avatar, Button, ConfigProvider, Flex, message, Modal } from "antd";
import { APP_ENV } from "../../../../env";
import { avatar } from "../../../../utils/images";
import { NavLink } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const StoryList = () => {
	const [stories, setStories] = useState<IStory[]>([]);
	const [currentStory, setCurrentStory] = useState<IStory>();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		apiClient
			.get("api/story/getAll")
			.then((res) => {
				setStories(res.data);
			})
			.catch(() => {
				message.error("Stories fetching error");
			});
	}, []);

	const getPublicationDate = (date: string) => new Date(date).toDateString();

	const getStory = (type: "next" | "prev") => {
		if (currentStory === undefined) {
			return;
		}

		let index = stories.indexOf(currentStory);
		type === "next" ? index++ : index--;

		if (index >= 0 && index < stories.length) {
			return stories[index];
		}

		setIsModalOpen(false);
	};

	return (
		<>
			<Flex
				gap="small"
				style={{ width: "100%", maxWidth: 600, overflowX: "auto" }}
			>
				{stories.map((story) => (
					<Avatar
						key={story.id}
						onClick={() => {
							setCurrentStory(story);
							setIsModalOpen(true);
						}}
						style={{
							border: " 3px solid #7F50FF",
							cursor: "pointer",
							minHeight: 80,
							minWidth: 80,
						}}
						size={80}
						src={
							story.user.avatar === null
								? avatar
								: `${APP_ENV.BASE_URL}/images/avatars/${story.user.avatar}`
						}
					/>
				))}
			</Flex>
			<ConfigProvider
				theme={{
					components: {
						Modal: {
							headerBg: "transperent",
							contentBg: "transperent",
							footerBg: "transperent",
						},
					},
				}}
			>
				<Modal
					open={isModalOpen}
					onCancel={() => setIsModalOpen(false)}
					footer={null}
					width="fit-content"
				>
					<Flex align="center" justify="center" gap="small">
						<Button
							icon={<ArrowLeftOutlined />}
							onClick={() => setCurrentStory(getStory("prev"))}
						/>
						<Flex
							justify="center"
							style={{
								height: "60vh",
								background: `url(${APP_ENV.BASE_URL}/images/stories/${currentStory?.image}) center no-repeat`,
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "auto 100%",
							}}
						>
							<NavLink
								to={`profile?userId=${currentStory?.user.id}`}
								style={{
									color: "black",
									height: "fit-content",
									padding: 5,
									background: "rgba(255,255,255,0.5)",
									borderRadius: 15,
								}}
							>
								<Flex>
									<Avatar
										size={60}
										src={
											currentStory?.user.avatar === null
												? avatar
												: `${APP_ENV.BASE_URL}/images/avatars/${currentStory?.user.avatar}`
										}
									/>
									<Flex vertical>
										<span style={{ fontWeight: 600, fontSize: 20 }}>
											{`${currentStory?.user.firstName} ${currentStory?.user.lastName}`}
										</span>
										<span>
											{getPublicationDate(currentStory?.createdAt ?? "")}
										</span>
									</Flex>
								</Flex>
							</NavLink>
						</Flex>
						<Button
							icon={<ArrowRightOutlined />}
							onClick={() => setCurrentStory(getStory("next"))}
						/>
					</Flex>
				</Modal>
			</ConfigProvider>
		</>
	);
};

export default StoryList;
