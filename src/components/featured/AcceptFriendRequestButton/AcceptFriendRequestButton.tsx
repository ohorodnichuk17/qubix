import { type ButtonProps, message, Button } from "antd";
import { useState } from "react";
import { apiClient } from "../../../utils/api/apiClient";

type AcceptFriendRequestButtonProps = ButtonProps & {
	friendId: string;
	afterAcceptRequestFn: () => void;
};

const AcceptFriendRequestButton: React.FC<AcceptFriendRequestButtonProps> = ({
	friendId,
	afterAcceptRequestFn,
	...buttonProps
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	const acceptFriendRequest = (e: React.MouseEvent) => {
        e.stopPropagation();
		const values = {
			friendId,
		};

		setLoading(true);

		apiClient
			.post("/api/friends/accept-friend-request", values)
			.then(() => {
				message.success("Friend Request accepted!");
				afterAcceptRequestFn();
			})
			.catch(() => {
				message.error("Friend request accepting error!");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Button loading={loading} onClick={acceptFriendRequest} {...buttonProps}>
			Accept friend request
		</Button>
	);
};

export default AcceptFriendRequestButton;