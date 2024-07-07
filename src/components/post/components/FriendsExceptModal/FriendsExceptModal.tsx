import { Card, Flex, Input, Modal, Tag } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import type { IUser } from "../../../../interfaces/account";
import { apiClient } from "../../../../utils/api/apiClient";
import {
	ActiveMinusImg,
	hoverMinusImg,
	minusImg,
} from "../../../../utils/images";

type FriendsExceptModalProps = {
	friendsExceptModalVisible: boolean;
	setFriendsExceptModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const FriendsExceptModal = ({
	friendsExceptModalVisible,
	setFriendsExceptModalVisible,
}: FriendsExceptModalProps) => {
	const account = useAppSelector((state) => state.account);
	const [friendsList, setFriendsList] = useState<IUser[]>([]);
	const [removedFriendsList, setRemovedFriendsList] = useState<IUser[]>([]);

	const [minus, setMinus] = useState(minusImg);

	useEffect(() => {
		apiClient
			.get(`/api/Friends/get-all-friends?userId=${account.user?.id}`)
			.then((res) => {
				console.log(res);
				setFriendsList(res.data);
			})
			.catch((error) => console.error(error));
	}, [account]);

	const removeFriend = (friendToRemove: IUser) => {
		setFriendsList(
			friendsList.filter((friend) => friend.id !== friendToRemove.id),
		);
		setRemovedFriendsList([...removedFriendsList, friendToRemove]);
	};

	const returnFriend = (friendToReturn: IUser) => {
		setFriendsList([...friendsList, friendToReturn]);
		setRemovedFriendsList(
			removedFriendsList.filter((friend) => friend.id !== friendToReturn.id),
		);
	};

	return (
		<Modal
			className="publication-audience-modal"
			okText="Save"
			title="Publication audience"
			open={friendsExceptModalVisible}
			onOk={() => setFriendsExceptModalVisible(false)}
			onCancel={() => setFriendsExceptModalVisible(false)}
		>
			<Input.Search />
			{friendsList ? (
				friendsList.map((friend) => (
					<Flex key={friend.id} align="center" justify="space-between">
						<img
							src={`http://localhost:5181/images/avatars/${friend?.avatar}`}
							alt="User avatar"
							className="h-50px"
						/>
						<p>{friend.userName}</p>
						<img
							src={minus}
							style={{ height: 25, width: 25, cursor: "pointer" }}
							alt="Friend except icon (minus)"
							onMouseEnter={() => setMinus(hoverMinusImg)}
							onMouseLeave={() => setMinus(minusImg)}
							onMouseDown={() => setMinus(ActiveMinusImg)}
							onKeyUp={() => setMinus(minusImg)}
							onClick={() => {
								removeFriend(friend);
								setMinus(minusImg);
							}}
						/>
					</Flex>
				))
			) : (
				<></>
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
		</Modal>
	);
};

export default FriendsExceptModal;
