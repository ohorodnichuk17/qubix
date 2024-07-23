import { Card, Col, Row, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IFriendRecommendation, ISendFriendRequest } from "./types";
import { avatar } from "../../../../utils/images";
import { APP_ENV } from "../../../../env";
import { useAppSelector } from "../../../../hooks/redux";

const FriendPage = () => {
	const { user } = useAppSelector((state) => state.account);
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

	const sendFriendRequest = (friendId: string) => {
		if (user?.id === undefined) {
			message.error("Send friend request error");
			return;
		}

		const sendFriendRequestBody: ISendFriendRequest = {
			friendId,
			userId: user?.id,
		};

		apiClient
			.post("/api/friends/send-friend-request", sendFriendRequestBody)
			.then(() => {
				message.success("Request successfully sended!");
			})
			.catch(() => {
				message.error("Request sending error");
			});
	};

	return (
		<div style={{ padding: "20px" }}>
			<h2>People you may know</h2>
			<Row gutter={[16, 16]}>
				{friends.map((friend) => (
					<Col span={6} key={friend.id}>
						<Card
							cover={
								<img alt="Friend recommendation avatar" src={friend.avatar} />
							}
							actions={[
								<Button
									type="primary"
									key="add"
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
				))}
			</Row>
		</div>
	);
};

export default FriendPage;
