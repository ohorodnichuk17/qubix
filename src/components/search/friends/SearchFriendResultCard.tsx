import { Avatar, Badge, Card, Flex, message } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { useAppSelector } from "../../../hooks/redux";
import { apiClient } from "../../../utils/api/apiClient";
import { avatarImg } from "../../../utils/images";
import AcceptFriendRequestButton from "../../featured/AcceptFriendRequestButton/AcceptFriendRequestButton";
import RejectFriendRequestButton from "../../featured/RejectFriendRequestButton/RejectFriendRequestButton";
import RemoveFriendButton from "../../featured/RemoveFriendButton/RemoveFriendButton";
import SendFriendRequestButton from "../../featured/SendFriendRequestButton/SendFriendRequestButton";
import type { IStory } from "../../story/list/types";
import StoryModal from "../../story/modal/StoryModal";
import type { ISearchUserResult } from "./types";

type SearchFriendResultCardProps = {
	friend: ISearchUserResult;
};

const SearchFriendResultCard = ({ friend }: SearchFriendResultCardProps) => {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.account);
	const [currentStory, setCurrentStory] = useState<IStory>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [relationshipsStatus, setRelationshipsStatus] = useState<number>();
	const [stories, setStories] = useState<IStory[]>([]);

	useEffect(() => {
		for (const story of friend.stories) {
			story.user = friend;
		}
		updateRelationshipStatus();
	}, [friend]);

	const isCurrentUserProfile = friend.id === user?.id;

	const updateRelationshipStatus = () => {
		if (!isCurrentUserProfile) {
			apiClient
				.get(`api/friends/relationships-status?friendId=${friend.id}`)
				.then((res) => {
					setRelationshipsStatus(res.data);
				});
		}
	};

	const handleDeleteStory = async (storyId: string) => {
		try {
			await apiClient.delete(`api/story/delete/${storyId}`);
			setStories(stories.filter((story) => story.id !== storyId));
			message.success("Story deleted successfully");
			setIsModalOpen(false);
		} catch (error) {
			message.error("Story deletion error");
		}
	};

	const handleNavigateStory = (type: "next" | "prev") => {
		if (!currentStory) return;

		let index = friend.stories.indexOf(currentStory);
		type === "next" ? index++ : index--;

		if (index >= 0 && index < friend.stories.length) {
			setCurrentStory(friend.stories[index]);
		} else {
			setIsModalOpen(false);
		}
	};

	const avatarUrl = friend.avatar
		? `${APP_ENV.BASE_URL}/images/avatars/${friend.avatar}`
		: avatarImg;

	return (
		<>
			<Card style={{ maxWidth: "400px", margin: "10px auto" }}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Avatar
						size={60}
						src={avatarUrl}
						onClick={() => {
							if (friend.stories.length > 0) {
								setCurrentStory(friend.stories[0]);
								setIsModalOpen(true);
							} else {
								navigate(`/profile?userId=${friend.id}`);
							}
						}}
						style={{
							border: friend.stories.length > 0 ? "3px solid #7F50FF" : "none",
							cursor: "pointer",
							minHeight: 60,
							minWidth: 60,
						}}
					/>
					<NavLink
						to={`/profile?userId=${friend.id}`}
						style={{ color: "black" }}
					>
						<h3 style={{ marginLeft: "10px" }}>
							{`${friend.firstName} ${friend.lastName}`}
						</h3>
					</NavLink>
				</div>
				<div style={{ marginTop: "10px", textAlign: "center" }}>
					{!isCurrentUserProfile && (
						<>
							{relationshipsStatus === 0 && (
								<SendFriendRequestButton
									friendId={friend.id}
									afterSendRequestFn={updateRelationshipStatus}
									type="primary"
									style={{ backgroundColor: "orange", borderColor: "orange" }}
								/>
							)}
							{relationshipsStatus === 1 && (
								<Flex vertical gap={5}>
									<Badge count={"friend"} color="orange" />
									<RemoveFriendButton
										friendId={friend.id}
										afterRemoveFriendFn={updateRelationshipStatus}
									/>
								</Flex>
							)}
							{relationshipsStatus === 2 && (
								<Flex vertical gap={5} style={{ padding: "0 5px" }}>
									<AcceptFriendRequestButton
										friendId={friend.id}
										afterAcceptRequestFn={updateRelationshipStatus}
									/>
									<RejectFriendRequestButton
										friendId={friend.id}
										afterRejectRequestFn={updateRelationshipStatus}
									/>
								</Flex>
							)}
							{relationshipsStatus === 3 && (
								<Badge count={"wait to accept"} color="orange" />
							)}
						</>
					)}
				</div>
			</Card>
			<StoryModal
				currentStory={currentStory}
				isModalOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onNavigate={handleNavigateStory}
				onDelete={(storyId) => handleDeleteStory(storyId)}
			/>
		</>
	);
};

export default SearchFriendResultCard;
