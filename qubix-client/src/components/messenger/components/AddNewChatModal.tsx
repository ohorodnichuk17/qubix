import { Avatar, Flex, Modal, message } from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import { useAppSelector } from "../../../hooks/redux";
import type { IUser } from "../../../interfaces/account";
import { apiClient } from "../../../utils/api/apiClient";
import { avatarImg } from "../../../utils/images";

type AddNewChatModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	loadChats: () => void;
};

const AddNewChatModal: React.FC<AddNewChatModalProps> = ({
	open,
	setOpen,
	loadChats,
}) => {
	const { user } = useAppSelector((state) => state.account);
	const [friends, setFriends] = useState<IUser[]>([]);
	useEffect(() => {
		apiClient
			.get(`/api/friends/get-all-friends?userId=${user?.id}`)
			.then((res) => {
				setFriends(res.data);
			})
			.catch(() => message.error("error"));
	}, [user]);

	const createChat = async (friendId: string) => {
		const data = {
			userId: user?.id,
			friendId,
		};
		try {
			await apiClient.post("api/chat", data);
			loadChats();
			closeModal();
		} catch (error) {
			message.error("Create chat error!");
		}
	};

	const closeModal = () => setOpen(false);

	if (friends.length < 1) return null;

	return (
		<Modal
			open={open}
			onOk={closeModal}
			onCancel={closeModal}
			title="Add new chat"
		>
			{friends.map((friend) => (
				<Flex
					key={friend.id}
					align="center"
					gap="small"
					style={{ cursor: "pointer" }}
					className="friend-list-item"
					onClick={() => createChat(friend.id)}
				>
					<Avatar
						size={50}
						src={
							friend.avatar === null
								? avatarImg
								: `${APP_ENV.BASE_URL}/images/avatars/${friend.avatar}`
						}
					/>
					<p>{friend.userName}</p>
				</Flex>
			))}
		</Modal>
	);
};

export default AddNewChatModal;
