import { UserOutlined } from "@ant-design/icons";
import { Card, Col } from "antd";
import { useNavigate } from "react-router-dom";
import SendFriendRequestButton from "../../featured/SendFriendRequestButton/SendFriendRequestButton";
import type { IFriendRecommendation } from "./types";

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
	const navigate = useNavigate();

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
				style={{ height: "100%", padding: 0 }}
				onClick={() => navigate(`/profile?userId=${friend.id}`)}
			>
				<img
					alt="Friend recommendation avatar"
					src={friend.avatar}
					style={{
						width: "100%",
						height: "auto",
						borderRadius: "50%",
						aspectRatio: "1/1",
						objectFit: "cover",
					}}
				/>
				<Card.Meta
					style={{ margin: "10px 0" }}
					avatar={<UserOutlined />}
					title={`${friend.lastName} ${friend.firstName}`}
				/>
				<SendFriendRequestButton
					key={friend.id}
					friendId={friend.id}
					afterSendRequestFn={() => removeSenderRequestFriend(friend)}
				/>
			</Card>
		</Col>
	);
};

export default FriendRecommendationCard;
