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

		setLoading(true);

		try {
			apiClient.post("/api/friends/accept-friend-request", { friendId });
			message.success("Friend Request accepted!");
			afterAcceptRequestFn();
		} catch (error) {
			message.error("Friend request accepting error!");
		}
		setLoading(false);
	};
	
	return (
		<Button loading={loading} onClick={acceptFriendRequest} {...buttonProps}>
			Accept friend request
		</Button>
	);
};

export default AcceptFriendRequestButton;
