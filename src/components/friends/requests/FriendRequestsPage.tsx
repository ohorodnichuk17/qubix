import { UserAddOutlined } from "@ant-design/icons";
import { Flex, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import { useAppSelector } from "../../../hooks/redux";
import { apiClient } from "../../../utils/api/apiClient";
import { avatarImg } from "../../../utils/images";
import type { IFriendRecommendation } from "../recommendations/types";
import FriendRequestCard from "./FriendRequestCard";

const { Title } = Typography;

const FriendRequestsPage = () => {
	const { user } = useAppSelector((state) => state.account);
	const [friends, setFriends] = useState<IFriendRecommendation[]>([]);

	useEffect(() => {
		apiClient.get(`/api/friends/requests?userId=${user?.id}`).then((res) => {
			const updatedFriends = res.data.map((friend: IFriendRecommendation) => ({
				...friend,
				avatar:
					friend.avatar === null
						? avatarImg
						: `${APP_ENV.BASE_URL}/images/avatars/${friend.avatar}`,
			}));
			setFriends(updatedFriends);
		});
	}, [user?.id]);

	const removeAcceptedRequestFriend = (
		acceptedRequestFriend: IFriendRecommendation,
	) =>
		setFriends(
			friends.filter((friend) => friend.id !== acceptedRequestFriend.id),
		);

	return (
		<>
			{friends.length === 0 && (
				<Flex
					vertical
					justify="center"
					align="center"
					style={{ height: "100%" }}
				>
					<UserAddOutlined style={{ fontSize: "64px" }} />
					<Title level={3}>Friend requests will be shown here</Title>
				</Flex>
			)}
			{friends.length > 0 && (
				<Row gutter={[16, 16]} wrap={true}>
					{friends.map((friend) => (
						<FriendRequestCard
							key={friend.id}
							friend={friend}
							removeAcceptedRequestFriend={removeAcceptedRequestFriend}
						/>
					))}
				</Row>
			)}
		</>
	);
};

export default FriendRequestsPage;
