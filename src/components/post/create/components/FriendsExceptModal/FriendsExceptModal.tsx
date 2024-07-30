import { Avatar, Card, Flex, Input, Modal, Tag } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../hooks/redux";
import type { IUser } from "../../../../../interfaces/account";
import { apiClient } from "../../../../../utils/api/apiClient";
import {
	ActiveMinusImg,
	avatar,
	hoverMinusImg,
	minusImg,
} from "../../../../../utils/images";
import { APP_ENV } from "../../../../../env";

type FriendsExceptModalProps = {
	friendsExceptModalVisible: boolean;
	setFriendsExceptModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setFriendsExceptList: React.Dispatch<React.SetStateAction<IUser[]>>;
};

const FriendsExceptModal = ({
	friendsExceptModalVisible,
	setFriendsExceptModalVisible,
	setFriendsExceptList,
}: FriendsExceptModalProps) => {
	const account = useAppSelector((state) => state.account);
	const [friendsList, setFriendsList] = useState<IUser[]>([]);
	const [filteredFriendsList, setFilteredFriendsList] = useState<IUser[]>([]);
	const [removedFriendsList, setRemovedFriendsList] = useState<IUser[]>([]);
	const [hoveredFriend, setHoveredFriend] = useState<string | null>(null);
	const [activeFriend, setActiveFriend] = useState<string | null>(null);

	useEffect(() => {
		apiClient
			.get(`/api/friends/get-all-friends?userId=${account.user?.id}`)
			.then((res) => {
				setFriendsList(res.data);
				setFilteredFriendsList(res.data);
			})
			.catch((error) => console.error(error));
	}, [account]);

	const removeFriend = (friendToRemove: IUser) => {
		setFriendsList(
			friendsList.filter((friend) => friend.id !== friendToRemove.id),
		);
		setFilteredFriendsList(
			filteredFriendsList.filter((friend) => friend.id !== friendToRemove.id),
		);
		setRemovedFriendsList([...removedFriendsList, friendToRemove]);
	};

	const returnFriend = (friendToReturn: IUser) => {
		setFriendsList([...friendsList, friendToReturn]);
		setFilteredFriendsList([...filteredFriendsList, friendToReturn]);
		setRemovedFriendsList(
			removedFriendsList.filter((friend) => friend.id !== friendToReturn.id),
		);
	};

	const getIcon = (friendId: string) => {
		if (activeFriend === friendId) {
			return ActiveMinusImg;
		}
		if (hoveredFriend === friendId) {
			return hoverMinusImg;
		}
		return minusImg;
	};

	const handleSearch = (value: string) => {
		const lowercasedValue = value.toLowerCase();
		const filteredList = friendsList.filter(
			(friend) =>
				friend.email.toLowerCase().includes(lowercasedValue) ||
				friend.firstName.toLowerCase().includes(lowercasedValue) ||
				friend.lastName.toLowerCase().includes(lowercasedValue),
		);
		setFilteredFriendsList(filteredList);
	};

	return (
		<Modal
			className="publication-visibility-modal"
			okText="Save"
			title="Publication visibility"
			open={friendsExceptModalVisible}
			onOk={() => {
				setFriendsExceptModalVisible(false);
				setFriendsExceptList(removedFriendsList);
			}}
			onCancel={() => setFriendsExceptModalVisible(false)}
		>
			<Flex vertical gap="middle">
				<Input.Search onSearch={handleSearch} />
				{filteredFriendsList.length ? (
					<Flex vertical gap="small">
						{filteredFriendsList.map((friend) => (
							<Flex key={friend.id} align="center" justify="space-between">
								<Avatar
									size={50}
									src={
										friend.avatar === null
											? avatar
											: `${APP_ENV.BASE_URL}/images/avatars/${friend.avatar}`
									}
								/>
								<p>{friend.userName}</p>
								{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
								<img
									src={getIcon(friend.id)}
									style={{ height: 25, width: 25, cursor: "pointer" }}
									alt="Friend except icon (minus)"
									onMouseEnter={() => setHoveredFriend(friend.id)}
									onMouseLeave={() => setHoveredFriend(null)}
									onMouseDown={() => setActiveFriend(friend.id)}
									onMouseUp={() => setActiveFriend(null)}
									onClick={() => {
										removeFriend(friend);
										setActiveFriend(null);
									}}
								/>
							</Flex>
						))}
					</Flex>
				) : (
					<p>No friends found</p>
				)}

				{removedFriendsList.length !== 0 && (
					<Card title="Friends who won't see your post">
						<Flex wrap="wrap" gap="small">
							{removedFriendsList.map((friend) => (
								<Tag
									key={friend.id}
									closable
									onClose={() => returnFriend(friend)}
									color="error"
									style={{ margin: 0 }}
								>
									{friend.userName}
								</Tag>
							))}
						</Flex>
					</Card>
				)}
			</Flex>
		</Modal>
	);
};

export default FriendsExceptModal;
