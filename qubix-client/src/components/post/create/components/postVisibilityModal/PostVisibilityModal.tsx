import { Divider, Flex, Modal, Radio, type RadioChangeEvent } from "antd";
import "./PostVisibilityModal.css";
import { useState } from "react";
import type { IUser } from "../../../../../interfaces/account";
import {
	friendsExceptImg,
	friendsImg,
	planetImg,
	userImg,
} from "../../../../../utils/images";
import FriendsExceptModal from "../friendsExceptModal/FriendsExceptModal";
import VisibilityOption from "./components/VisibilityOption";

type PostVisibilityModalProps = {
	visibilityModalVisible: boolean;
	setVisibilityModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	visibility: string;
	handleVisibilityChange: (e: RadioChangeEvent) => void;
	setFriendsExceptList: React.Dispatch<React.SetStateAction<IUser[]>>;
};

const PostVisibilityModal = ({
	visibilityModalVisible,
	setVisibilityModalVisible,
	visibility,
	handleVisibilityChange,
	setFriendsExceptList,
}: PostVisibilityModalProps) => {
	const [friendsExceptModalVisible, setFriendsExceptModalVisible] =
		useState<boolean>(false);

	return (
		<>
			<Modal
				className="publication-visibility-modal"
				okText="Save"
				title="Publication visibility"
				open={visibilityModalVisible}
				onOk={() => setVisibilityModalVisible(false)}
				onCancel={() => setVisibilityModalVisible(false)}
			>
				<p style={{ fontWeight: "bold" }}>Who can see your post?</p>
				<p>
					Your post will appear in your Feed, your profile, and search results.
				</p>
				<p>Your default visibility is: Public. </p>
				<p>You can choose an visibility specifically for this post.</p>
				<Divider />
				<Radio.Group onChange={handleVisibilityChange} value={visibility}>
					<Flex vertical gap="middle">
						<VisibilityOption
							value="public"
							imgSrc={planetImg}
							imgAlt="Public post icon (planet)"
							title="Public"
							description="Everyone on and off the Qubix network"
						/>
						<VisibilityOption
							value="friends only"
							imgSrc={friendsImg}
							imgAlt="Post for friends icon (friends)"
							title="Friends"
							description="Your friends on Qubix"
						/>
						<VisibilityOption
							value="friends except"
							imgSrc={friendsExceptImg}
							imgAlt="Post for friends, except... icon (friends)"
							title="Friends, except..."
							description="Don't show this post to some friends"
							onClick={() => setFriendsExceptModalVisible(true)}
						/>
						<VisibilityOption
							value="private"
							imgSrc={userImg}
							imgAlt="Private post icon (user)"
							title="Just me"
						/>
					</Flex>
				</Radio.Group>
			</Modal>
			<FriendsExceptModal
				friendsExceptModalVisible={friendsExceptModalVisible}
				setFriendsExceptModalVisible={setFriendsExceptModalVisible}
				setFriendsExceptList={setFriendsExceptList}
			/>
		</>
	);
};

export default PostVisibilityModal;
