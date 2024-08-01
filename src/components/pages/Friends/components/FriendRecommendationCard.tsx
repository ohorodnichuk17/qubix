import { UserOutlined } from "@ant-design/icons";
import { Col, Card, Button, message } from "antd";
import type { IFriendRecommendation, ISendFriendRequest } from "../types";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FriendRecommendationCardProps = {
	friend: IFriendRecommendation;
	removeSenderRequestFriend: (
		senderRequestFriend: IFriendRecommendation,
	) => void;
};

const FriendRecommendationCard = ({
	friend,
	removeSenderRequestFriend,
}: FriendRecommendationCardProps) => {
	const { user } = useAppSelector((state) => state.account);
	const navigate = useNavigate();

	const [loading, setloading] = useState<boolean>(false);

	const sendFriendRequest = (friendId: string) => {
		if (user?.id === undefined) {
			message.error("Send friend request error");
			return;
		}

		setloading(true);

		const sendFriendRequestBody: ISendFriendRequest = {
			friendId,
			userId: user?.id,
		};

		apiClient
			.post("/api/friends/send-friend-request", sendFriendRequestBody)
			.then(() => {
				message.success("Request successfully sended!");
				removeSenderRequestFriend(friend);
			})
			.catch(() => {
				message.error("Request sending error");
			})
			.finally(() => {
				setloading(false);
			});
	};

	return (
		<Col
			style={{ minWidth: 250 }}
			xs={{ flex: "100%" }}
			sm={{ flex: "50%" }}
			md={{ flex: "40%" }}
			lg={{ flex: "20%" }}
			xl={{ flex: "10%" }}
			key={friend.id}
		>
			<Card
				onClick={() => navigate(`/profile?userId=${friend.id}`)}
				cover={<img alt="Friend recommendation avatar" src={friend.avatar} />}
				actions={[
					<Button
						type="primary"
						key="add"
						loading={loading}
						onClick={() => sendFriendRequest(friend.id)}
					>
						Add friend
					</Button>,
				]}
			>
				<Card.Meta
					avatar={<UserOutlined />}
					title={`${friend.lastName} ${friend.firstName}`}
				/>
			</Card>
		</Col>
	);
};

export default FriendRecommendationCard;
