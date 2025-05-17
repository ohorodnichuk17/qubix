import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import AcceptFriendRequestButton from "../../featured/acceptFriendRequestButton/AcceptFriendRequestButton";
import RejectFriendRequestButton from "../../featured/rejectFriendRequestButton/RejectFriendRequestButton";
import type { IFriendRecommendation } from "../recommendations/types";

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
					<Flex vertical gap={5} style={{ padding: "0 5px" }} key="actions">
						<AcceptFriendRequestButton
							friendId={friend.id}
							afterAcceptRequestFn={() => removeAcceptedRequestFriend(friend)}
						/>
						<RejectFriendRequestButton
							friendId={friend.id}
							afterRejectRequestFn={() => removeAcceptedRequestFriend(friend)}
						/>
					</Flex>,
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
