import { Grid, Layout, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import FriendSidebar from "../FriendPage/FriendSidebar";
import { UserAddOutlined } from "@ant-design/icons";
import FriendRequestCard from "../FriendPage/components/FriendRequestCard";
import type { IFriendRecommendation } from "../FriendPage/types";
import { avatar } from "../../../../utils/images";
import { APP_ENV } from "../../../../env";

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title } = Typography;

const FriendRequest = () => {
	const screens = useBreakpoint();

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
		<div>
			<FriendSidebar select="2" />
			<Layout
				style={{
					marginLeft: screens.xs ? 80 : 256,
					transition: "margin-left 0.2s",
				}}
			>
				<Content
					style={{
						margin: "24px 16px 0",
						overflow: "initial",
						textAlign: "center",
					}}
				>
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
				</Content>
			</Layout>
		</div>
	);
};

export default FriendRequest;
