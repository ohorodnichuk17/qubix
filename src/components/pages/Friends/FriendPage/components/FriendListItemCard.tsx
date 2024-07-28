import { UserOutlined } from "@ant-design/icons";
import { Col, Card } from "antd";
import type { IFriendRecommendation } from "../types";
import { useNavigate } from "react-router-dom";

type FriendRecommendationCardProps = {
	friend: IFriendRecommendation;
};

const FriendListItemCard = ({ friend }: FriendRecommendationCardProps) => {
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
						alt="Friend avatar"
						src={friend.avatar}
					/>
				}
			>
				<Card.Meta
					avatar={<UserOutlined />}
					title={`${friend.lastName} ${friend.firstName}`}
				/>
			</Card>
		</Col>
	);
};

export default FriendListItemCard;