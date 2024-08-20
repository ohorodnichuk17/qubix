import { Button, type ButtonProps, message } from "antd";
import { useState } from "react";
import { apiClient } from "../../../utils/api/apiClient";

type SendFriendRequestButtonProps = ButtonProps & {
	friendId: string;
	afterSendRequestFn: () => void;
};

const SendFriendRequestButton: React.FC<SendFriendRequestButtonProps> = ({
	friendId,
	afterSendRequestFn,
	...buttonProps
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	const sendFriendRequest = () => {
		if (friendId === null) {
			return;
		}

		setLoading(true);
		apiClient
			.post("/api/friends/send-request", { friendId })
			.then(() => {
				message.success("Request successfully sended!");
				afterSendRequestFn();
			})
			.catch(() => {
				message.error("Request sending error");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Button loading={loading} onClick={sendFriendRequest} {...buttonProps}>
			Send friend request
		</Button>
	);
};

export default SendFriendRequestButton;