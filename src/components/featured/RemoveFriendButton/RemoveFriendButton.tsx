import { DeleteOutlined } from "@ant-design/icons";
import { Button, type ButtonProps, message } from "antd";
import { useState } from "react";
import { apiClient } from "../../../utils/api/apiClient";

type RemoveFriendButtonProps = ButtonProps & {
	friendId: string;
	afterRemoveFriendFn: () => void;
};

const RemoveFriendButton: React.FC<RemoveFriendButtonProps> = ({
	friendId,
	afterRemoveFriendFn,
	...buttonProps
}) => {
	const [loading, setLoading] = useState<boolean>(false);

	const removeFriend = async () => {
		setLoading(true);
		try {
			await apiClient.delete("api/friends", { data: { friendId } });
			message.success("Friend successfully removed!");
			afterRemoveFriendFn();
		} catch (error) {
			message.error("Friend remove error");
		}
		setLoading(false);
	};

	return (
		<Button
			icon={<DeleteOutlined />}
			loading={loading}
			onClick={removeFriend}
			{...buttonProps}
		>
			Remove friend
		</Button>
	);
};

export default RemoveFriendButton;
