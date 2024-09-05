import { Button, type ButtonProps, message } from "antd";
import { useState } from "react";
import { apiClient } from "../../../utils/api/apiClient";

type RejectFriendRequestButtonProps = ButtonProps & {
	friendId: string;
	afterRejectRequestFn: () => void;
};

const RejectFriendRequestButton: React.FC<RejectFriendRequestButtonProps> = ({
	friendId,
	afterRejectRequestFn,
	...buttonProps
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	const rejectFriendRequest = async (e: React.MouseEvent) => {
		e.stopPropagation();

		setLoading(true);
		try {
			await apiClient.post("/api/friends/reject-request", { friendId });
			message.success("Friend Request rejected!");
			afterRejectRequestFn();
		} catch (error) {
			message.error("Friend request rejecting error!");
		}
		setLoading(false);
	};

	return (
		<Button loading={loading} onClick={rejectFriendRequest} {...buttonProps}>
			Reject friend request
		</Button>
	);
};

export default RejectFriendRequestButton;
