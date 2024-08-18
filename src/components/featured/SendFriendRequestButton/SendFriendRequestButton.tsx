import { Button, type ButtonProps, message } from "antd";
import { useState } from "react";
import { apiClient } from "../../../utils/api/apiClient";
import { useAppSelector } from "../../../hooks/redux";
import type { ISendFriendRequest } from "./types";

type SendFriendRequestButtonProps = ButtonProps & {
	friendId: string;
	afterSendRequestFn: () => void;
};

const SendFriendRequestButton: React.FC<SendFriendRequestButtonProps> = ({
	friendId,
	afterSendRequestFn,
	...buttonProps
}) => {
	const { user } = useAppSelector((state) => state.account);
	const [loading, setLoading] = useState<boolean>(false);

	const sendFriendRequest = () => {
		if (user?.id === undefined) {
			message.error("Send friend request error");
			return;
		}

		if (friendId === null) {
			return;
		}

		const sendFriendRequestBody: ISendFriendRequest = {
			friendId,
			userId: user?.id,
		};

		setLoading(true);
		apiClient
			.post("/api/friends/send-friend-request", sendFriendRequestBody)
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