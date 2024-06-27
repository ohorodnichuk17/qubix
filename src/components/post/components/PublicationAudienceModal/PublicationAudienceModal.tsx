import { Modal, Divider, Radio, Flex } from "antd";
import './PublicationAudienceModal.css'
import { planetImg, friendsImg, friendsExceptImg, userImg } from "../../../../utils/images";
import { useState } from "react";
import FriendsExceptModal from "../FriendsExceptModal/FriendsExceptModal";

type PublicationAudienceModalProps = {
    audienceModalVisible: boolean;
    setAudienceModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    audience: string;
    handleAudienceChange: (e: any) => void;
}

const PublicationAudienceModal = ({ audienceModalVisible, setAudienceModalVisible, audience, handleAudienceChange }: PublicationAudienceModalProps) => {
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
						<Radio value={"Public"}>
							<Flex align="center" gap="middle">
								<div className="publication-audience-img-circle">
									<img src={planetImg} className="h-50px" />
								</div>
								<Flex vertical>
									<p className="publication-audience-radio-title">Public</p>
									<p>Everyone on and off the Quilt network</p>
								</Flex>
							</Flex>
						</Radio>
						<Radio value={"Friends"}>
							<Flex align="center" gap="middle">
								<div className="publication-audience-img-circle">
									<img src={friendsImg} className="h-50px" />
								</div>
								<Flex vertical>
									<p className="publication-audience-radio-title">Friends</p>
									<p>Your friends on Quilt</p>
								</Flex>
							</Flex>
						</Radio>
						<Radio
							value={"Friends, except..."}
							onClick={() => setFriendsExceptModalVisible(true)}
						>
							<Flex align="center" gap="middle">
								<div className="publication-audience-img-circle">
									<img src={friendsExceptImg} className="h-50px" />
								</div>
								<Flex vertical>
									<p className="publication-audience-radio-title">
										Friends, except...
									</p>
									<p>Don't show this post to some friends</p>
								</Flex>
							</Flex>
						</Radio>
						<Radio value={"Just me"}>
							<Flex align="center" gap="middle">
								<div className="publication-audience-img-circle">
									<img src={userImg} className="h-50px" />
								</div>
								<Flex vertical>
									<p className="publication-audience-radio-title">Just me</p>
								</Flex>
							</Flex>
						</Radio>
					</Flex>
				</Radio.Group>
			</Modal>
			<FriendsExceptModal
				friendsExceptModalVisible={friendsExceptModalVisible}
				setFriendsExceptModalVisible={setFriendsExceptModalVisible}
			/>
		</>
	);
}

export default PublicationAudienceModal;