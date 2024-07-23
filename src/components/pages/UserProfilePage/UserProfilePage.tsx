import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Card,
	Divider,
	Dropdown,
	Flex,
	Menu,
	Row,
	message,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import type { UploadChangeParam } from "antd/es/upload";
import { useDispatch } from "react-redux";
import { APP_ENV } from "../../../env";
import { useAppSelector } from "../../../hooks/redux";
import { updateAvatar } from "../../../store/account/account.slice";
import type { FileType } from "../../../types/FileType";
import { apiClient } from "../../../utils/api/apiClient";
import { getBase64 } from "../../../utils/helpers/getBase64";
import { avatar as avatarImg, bg6 } from "../../../utils/images";
// import AvatarMenu from "./components/AvatarMenu";
import CoverPhotoBlock from "./components/CoverPhotoBlock";
import EditProfileModal from "./components/EditProfileModal";
import { AvatarButton } from "./styled";
import type { IUserProfile } from "./types";
import { useSearchParams } from "react-router-dom";
import * as styles from "./styles";
import ShortInformationCard from "./components/ShortInformationCard";
import AvatarMenu from "./menus/AvatarMenu";

const UserProfilePage: React.FC = () => {
	const [coverPhoto, setCoverPhoto] = useState(bg6);
	const [avatar, setAvatar] = useState(avatarImg);
	const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
	const dispatch = useDispatch();
	const { user } = useAppSelector((state) => state.account);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [searchParams] = useSearchParams();
	const userId = searchParams.get("userId");
	const isCurrentUserProfile = userId === null || userId === user?.id;

	useEffect(() => {
		if (!user?.id && !userId) {
			return;
		}

		apiClient
			.get(
				`/api/user-profile/get-profile-by-id?UserId=${isCurrentUserProfile ? user?.id : userId}`,
			)
			.then((response) => {
				setUserProfile(response.data);

				if (response.data.coverPhoto) {
					setCoverPhoto(
						`${APP_ENV.BASE_URL}/images/coverPhotos/${response.data.coverPhoto}`,
					);
				} 

				if (response.data.userEntity.avatar) {
					setAvatar(
						`${APP_ENV.BASE_URL}/images/avatars/${response.data.userEntity.avatar}`,
					);
				}
			})
			.catch((error) => {
				message.error("There was an error fetching the user data!");
				console.error("There was an error fetching the user data!", error);
			});
	}, [isCurrentUserProfile, user?.id, userId]);

	const handleUploadChange = async (
		info: UploadChangeParam,
		type: "avatar" | "coverPhoto",
	) => {
		const file = info.fileList[0];
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		const preview = file.url || (file.preview as string);

		if (type === "avatar") {
			setAvatar(preview);
		} else {
			setCoverPhoto(preview);
		}

		const formData = new FormData();
		if (user?.id) {
			formData.append("userId", user.id);
		}
		formData.append(type, file.originFileObj as FileType);

		apiClient
			.put("/api/user-profile/edit-profile", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				if (type === "avatar") {
					const newAvatar = `/images/avatars/${res.data.userEntity.avatar}`;
					dispatch(updateAvatar(newAvatar));
				}
			})
			.catch((error) => {
				console.error(error);
				message.error(`Failed to change ${type}`);
			});
	};

	const handleCoverPhotoChange = async (info: UploadChangeParam) =>
		handleUploadChange(info, "coverPhoto");

	const handleAvatarChange = async (info: UploadChangeParam) =>
		handleUploadChange(info, "avatar");

	return (
		<div style={{ backgroundColor: "#FFEBE0", padding: 0, height: "100%" }}>
			<Row justify="center" align="middle">
				<Card style={styles.profileCard}>
					<CoverPhotoBlock
						coverPhoto={coverPhoto}
						setCoverPhoto={setCoverPhoto}
						handleCoverPhotoChange={handleCoverPhotoChange}
						isCurrentUserProfile={isCurrentUserProfile}
					/>
					<Flex
						align="center"
						justify="space-between"
						wrap="wrap"
						style={{ marginTop: "-5%" }}
					>
						<Flex align="center" wrap="wrap" gap="middle">
							<Avatar size={160} src={avatar} />
							{isCurrentUserProfile && (
								<Dropdown
									menu={{
										items: AvatarMenu({
											avatar,
											handleAvatarChange,
											setAvatar,
										}),
									}}
									trigger={["click"]}
								>
									<AvatarButton icon={<CameraOutlined />} />
								</Dropdown>
							)}
							<p style={{ fontSize: 24 }}>
								{`${userProfile?.userEntity.firstName} ${userProfile?.userEntity.lastName}`}
							</p>
						</Flex>
						{isCurrentUserProfile && (
							<>
								<Button
									icon={<EditOutlined />}
									type="primary"
									onClick={() => setIsModalVisible(true)}
								>
									Edit Profile
								</Button>
								<EditProfileModal
									isModalVisible={isModalVisible}
									setIsModalVisible={setIsModalVisible}
									userProfile={userProfile}
								/>
							</>
						)}
					</Flex>

					<Divider />

					<Flex justify="center">
						<Menu
							style={styles.profileMenu}
							mode="horizontal"
							defaultSelectedKeys={["1"]}
						>
							<Menu.Item key="1">Posts</Menu.Item>
							<Menu.Item key="2">Information</Menu.Item>
							<Menu.Item key="3">Friends</Menu.Item>
						</Menu>
					</Flex>
					<ShortInformationCard userProfile={userProfile} />
				</Card>
			</Row>
		</div>
	);
};

export default UserProfilePage;
