import { UserOutlined } from "@ant-design/icons";
import { Col, Card } from "antd";
import type { IFriendRecommendation } from "../types";
import { useNavigate } from "react-router-dom";
import SendFriendRequestButton from "../../../featured/SendFriendRequestButton/SendFriendRequestButton";

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
				onClick={() => navigate(`/profile?userId=${friend.id}`)}
				cover={<img alt="Friend recommendation avatar" src={friend.avatar} />}
				actions={[
					<SendFriendRequestButton
						key={friend.id}
						friendId={friend.id}
						afterSendRequestFn={() => removeSenderRequestFriend(friend)}
					/>,
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
