import { Button, message, type ButtonProps } from "antd";
import { useState } from "react";
import { apiClient } from "../../../utils/api/apiClient";
import { DeleteOutlined } from "@ant-design/icons";

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
	const removeFriend = () => {
		setLoading(true);

		apiClient
			.delete("api/friends", { data: { friendId } })
			.then(() => {
				message.success("Friend successfully removed!");
				afterRemoveFriendFn();
			})
			.catch(() => {
				message.error("Friend remove error");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Button icon={<DeleteOutlined/>} loading={loading} onClick={removeFriend} {...buttonProps}>
			Remove friend
		</Button>
	);
};

export default RemoveFriendButton;