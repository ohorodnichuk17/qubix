import { Row, message } from "antd";
import { useEffect, useState } from "react";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IFriendRecommendation } from "./types";
import { avatar } from "../../../../utils/images";
import { APP_ENV } from "../../../../env";
import FriendRecommendationCard from "./components/FriendRecommendationCard";

const FriendPage = () => {
	const [friends, setFriends] = useState<IFriendRecommendation[]>([]);

	useEffect(() => {
		apiClient
			.get("/api/friends/recommendations")
			.then((res) => {
				const updatedFriends = res.data.map(
					(friend: IFriendRecommendation) => ({
						...friend,
						avatar:
							friend.avatar === null
								? avatar
								: `${APP_ENV.BASE_URL}/images/avatars/${friend.avatar}`,
					}),
				);
				setFriends(updatedFriends);
			})
			.catch(() => {
				message.error("Friends recommendations error!");
			});
	}, []);

	const removeSenderRequestFriend = (
		senderRequestFriend: IFriendRecommendation,
	) =>
		setFriends(
			friends.filter((friend) => friend.id !== senderRequestFriend.id),
		);

	return (
		<div style={{ padding: "20px" }}>
			<h2>People you may know</h2>
			<Row gutter={[16, 16]}>
				{friends.map((friend) => (
					<FriendRecommendationCard
						key={friend.id}
						friend={friend}
						removeSenderRequestFriend={removeSenderRequestFriend}
					/>
				))}
			</Row>
		</div>
	);
};

export default FriendPage;
