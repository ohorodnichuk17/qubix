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

	const sendFriendRequest = async () => {
		if (friendId === null) {
			return;
		}

		setLoading(true);
		try {
			await apiClient.post("/api/friends/send-request", { friendId });
			message.success("Request successfully sended!");
			afterSendRequestFn();
		} catch (error) {
			message.error("Request sending error");
		}
		setLoading(false);
	};

	return (
		<Button loading={loading} onClick={sendFriendRequest} {...buttonProps}>
			Send friend request
		</Button>
	);
};

export default SendFriendRequestButton;
