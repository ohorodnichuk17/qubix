import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Flex, Modal } from "antd";
import type React from "react";
import { NavLink } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { useAppSelector } from "../../../hooks/redux";
import { avatarImg } from "../../../utils/images";
import type { IStory } from "../list/types";

interface StoryModalProps {
	currentStory?: IStory;
	isModalOpen: boolean;
	onClose: () => void;
	onNavigate: (type: "next" | "prev") => void;
	onDelete: (storyId: string) => void;
}

const StoryModal: React.FC<StoryModalProps> = ({
	currentStory,
	isModalOpen,
	onClose,
	onNavigate,
	onDelete,
}) => {
	const { user } = useAppSelector((state) => state.account);

	const getPublicationDate = (date: string) => new Date(date).toDateString();

	return (
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
				onCancel={onClose}
				footer={null}
				width="fit-content"
			>
				<Flex align="center" justify="center" gap="small">
					<Button
						icon={<ArrowLeftOutlined />}
						onClick={() => onNavigate("prev")}
					/>
					{currentStory ? (
						<Flex vertical justify="center">
							<NavLink
								to={`/profile?userId=${currentStory?.user.id}`}
								style={{
									color: "black",
									height: "fit-content",
									padding: 5,
									background: "rgba(255,255,255,0.5)",
									borderRadius: 15,
									position: "relative",
									top: "5vh",
								}}
							>
								<Flex>
									<Avatar
										size={60}
										src={
											currentStory?.user.avatar === null
												? avatarImg
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
							<img
								src={`${APP_ENV.BASE_URL}/images/stories/${currentStory.image}`}
								alt="story"
								style={{ height: "60vh" }}
							/>
							{currentStory.user.id === user?.id && (
								<Button
									icon={<DeleteOutlined />}
									onClick={() => onDelete(currentStory.id)}
									style={{ marginTop: 10 }}
								>
									Delete Story
								</Button>
							)}
						</Flex>
					) : (
						<p>No story available</p>
					)}
					<Button
						icon={<ArrowRightOutlined />}
						onClick={() => onNavigate("next")}
					/>
				</Flex>
			</Modal>
		</ConfigProvider>
	);
};

export default StoryModal;
