import { UserOutlined } from "@ant-design/icons";
import { Col, Card, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../../../utils/api/apiClient";
import { useState } from "react";
import type { IFriendRecommendation } from "../types";

type FriendRequestCardProps = {
	friend: IFriendRecommendation;
	removeAcceptedRequestFriend: (
		acceptedRequestFriend: IFriendRecommendation,
	) => void;
};

const FriendRequestCard = ({
	friend,
	removeAcceptedRequestFriend,
}: FriendRequestCardProps) => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);

	const acceptFriendRequest = (e: React.MouseEvent) => {
		e.stopPropagation();

		const values = {
			friendId: friend.id,
		};

		setLoading(true);

		apiClient
			.post("/api/friends/accept-friend-request", values)
			.then(() => {
				message.success("Friend Request accepted!");
				removeAcceptedRequestFriend(friend);
			})
			.catch(() => {
				message.error("Friend request accepting error!");
			})
			.finally(() => {
				setLoading(false);
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
		>
			<Card
				style={{ cursor: "pointer" }}
				onClick={() => navigate(`/profile?userId=${friend.id}`)}
				cover={
					<img
						style={{ height: 200, objectFit: "cover" }}
						alt="Friend recommendation avatar"
						src={friend.avatar}
					/>
				}
				actions={[
					<Button
						type="primary"
						key="add"
						loading={loading}
						onClick={acceptFriendRequest}
					>
						Accept friend request
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

export default FriendRequestCard;