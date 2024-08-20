import { UserOutlined } from "@ant-design/icons";
import { Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import type { IFriendRecommendation } from "../types";
import AcceptFriendRequestButton from "../../../featured/AcceptFriendRequestButton/AcceptFriendRequestButton";

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
					<AcceptFriendRequestButton
						key="add"
						friendId={friend.id}
						afterAcceptRequestFn={() => removeAcceptedRequestFriend(friend)}
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

export default FriendRequestCard;
