import { type ButtonProps, message, Button } from "antd";
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

	const rejectFriendRequest = (e: React.MouseEvent) => {
        e.stopPropagation();

		setLoading(true);

		apiClient
			.post("/api/friends/reject-request", {friendId})
			.then(() => {
				message.success("Friend Request rejected!");
				afterRejectRequestFn();
			})
			.catch(() => {
				message.error("Friend request rejecting error!");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Button loading={loading} onClick={rejectFriendRequest} {...buttonProps}>
			Reject friend request
		</Button>
	);
};

export default RejectFriendRequestButton;