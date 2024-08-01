import { Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { apiClient } from "../../../utils/api/apiClient";
import { UserAddOutlined } from "@ant-design/icons";
import FriendRequestCard from "./components/FriendRequestCard";
import type { IFriendRecommendation } from "./types";
import { avatar } from "../../../utils/images";
import { APP_ENV } from "../../../env";

const { Title } = Typography;

const FriendRequests = () => {
	const { user } = useAppSelector((state) => state.account);
	const [friends, setFriends] = useState<IFriendRecommendation[]>([]);

	useEffect(() => {
		apiClient.get(`/api/friends/requests?userId=${user?.id}`).then((res) => {
			const updatedFriends = res.data.map((friend: IFriendRecommendation) => ({
				...friend,
				avatar:
					friend.avatar === null
						? avatar
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
				<>
					<UserAddOutlined style={{ fontSize: "64px" }} />
					<Title level={3}>Friend requests will be shown here</Title>
				</>
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

export default FriendRequests;
