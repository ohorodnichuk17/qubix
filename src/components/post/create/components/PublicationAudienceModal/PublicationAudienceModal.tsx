import { Modal, Divider, Radio, Flex, type RadioChangeEvent } from "antd";
import "./PublicationAudienceModal.css";
import {
	planetImg,
	friendsImg,
	friendsExceptImg,
	userImg,
} from "../../../../../utils/images";
import { useState } from "react";
import FriendsExceptModal from "../FriendsExceptModal/FriendsExceptModal";
import AudienceOption from "./components/AudienceOption";

type PublicationAudienceModalProps = {
	audienceModalVisible: boolean;
	setAudienceModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	audience: string;
	handleAudienceChange: (e: RadioChangeEvent) => void;
};

const PublicationAudienceModal = ({
	audienceModalVisible,
	setAudienceModalVisible,
	audience,
	handleAudienceChange,
}: PublicationAudienceModalProps) => {
	const [friendsExceptModalVisible, setFriendsExceptModalVisible] =
		useState<boolean>(false);

	return (
		<>
			<Modal
				className="publication-audience-modal"
				okText="Save"
				title="Publication audience"
				open={audienceModalVisible}
				onOk={() => setAudienceModalVisible(false)}
				onCancel={() => setAudienceModalVisible(false)}
			>
				<p style={{ fontWeight: "bold" }}>Who can see your post?</p>
				<p>
					Your post will appear in your Feed, your profile, and search results.
				</p>
				<p>Your default audience is: Public. </p>
				<p>You can choose an audience specifically for this post.</p>
				<Divider />
				<Radio.Group onChange={handleAudienceChange} value={audience}>
					<Flex vertical gap="middle">
						<AudienceOption
							value="Public"
							imgSrc={planetImg}
							imgAlt="Public post icon (planet)"
							title="Public"
							description="Everyone on and off the Quilt network"
						/>
						<AudienceOption
							value="Friends"
							imgSrc={friendsImg}
							imgAlt="Post for friends icon (friends)"
							title="Friends"
							description="Your friends on Quilt"
						/>
						<AudienceOption
							value="Friends, except..."
							imgSrc={friendsExceptImg}
							imgAlt="Post for friends, except... icon (friends)"
							title="Friends, except..."
							description="Don't show this post to some friends"
							onClick={() => setFriendsExceptModalVisible(true)}
						/>
						<AudienceOption
							value="Just me"
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
			/>
		</>
	);
};

export default PublicationAudienceModal;
