import { Button, Card, Form, Input, message } from "antd";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import type { ISendFriendRequest } from "./types";

const AddFriend = () => {
	const { user } = useAppSelector((state) => state.account);

	const sendFriendRequest = (values: ISendFriendRequest) => {
		apiClient
			.post("/api/friends/send-friend-request", values)
			.then(() => {
				message.success("Request successfully sended!");
			})
			.catch(() => {
				message.error("Request sending error");
			});
	};

	return (
		<Card>
			<Form onFinish={sendFriendRequest}>
				<Form.Item hidden name="userId" initialValue={user?.id} />
				<Form.Item name="friendId">
					<Input />
				</Form.Item>

				<Button htmlType="submit">Send request</Button>
			</Form>
		</Card>
	);
};

export default AddFriend;
