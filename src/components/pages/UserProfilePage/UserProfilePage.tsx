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
import useAvatar from "../../../hooks/useAvatar";
import { updateAvatar } from "../../../store/account/account.slice";
import type { FileType } from "../../../types/FileType";
import { apiClient } from "../../../utils/api/apiClient";
import { getBase64 } from "../../../utils/helpers/getBase64";
import { bg6, house, pronouns } from "../../../utils/images";
import AvatarMenu from "./components/AvatarMenu";
import CoverPhotoBlock from "./components/CoverPhotoBlock";
import EditProfileModal from "./components/EditProfileModal";
import { AvatarButton } from "./styled";
import type { IUserProfile } from "./types";

const UserProfilePage: React.FC = () => {
	const [coverPhoto, setCoverPhoto] = useState(bg6);
	const avatarFromHook = useAvatar();
	const [avatar, setAvatar] = useState(avatarFromHook);
	const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
	const dispatch = useDispatch();
	const { user } = useAppSelector((state) => state.account);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		if (user?.id) {
			apiClient
				.get(`/api/user-profile/get-profile-by-id?UserId=${user.id}`)
				.then((response) => {
					setUserProfile(response.data);

					if (
						response.data.coverPhoto !== "" &&
						response.data.coverPhoto !== null
					) {
						setCoverPhoto(
							`${APP_ENV.BASE_URL}/images/coverPhotos/${response.data.coverPhoto}`,
						);
					} else {
						setCoverPhoto(bg6);
					}
				})
				.catch((error) => {
					console.error("There was an error fetching the user data!", error);
				});
		}
	}, [user?.id]);

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
				<Card
					style={{
						width: "100%",
						maxWidth: "1200px",
						background: "transparent",
						border: "none",
						boxShadow: "none",
					}}
				>
					<CoverPhotoBlock
						coverPhoto={coverPhoto}
						setCoverPhoto={setCoverPhoto}
						handleCoverPhotoChange={handleCoverPhotoChange}
					/>
					<Flex
						align="center"
						justify="space-between"
						wrap="wrap"
						style={{ marginTop: "-5%" }}
					>
						<Flex align="center" wrap="wrap">
							<Avatar size={160} src={avatar} />
							<Dropdown
								overlay={
									<AvatarMenu
										avatar={avatar}
										handleAvatarChange={handleAvatarChange}
										setAvatar={setAvatar}
									/>
								}
								trigger={["click"]}
							>
								<AvatarButton
									style={{
										border: "none",
										color: "black",
										borderRadius: "100px",
									}}
									icon={<CameraOutlined />}
								/>
							</Dropdown>
							<p style={{ fontSize: 24 }}>{user?.email}</p>
						</Flex>

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
					</Flex>

					<Divider />
					<Row justify="center">
						<Menu
							style={{
								backgroundColor: "transparent",
								border: "none",
								fontSize: "26px",
							}}
							mode="horizontal"
							defaultSelectedKeys={["1"]}
						>
							<Menu.Item key="1">Posts</Menu.Item>
							<Menu.Item key="2">Information</Menu.Item>
							<Menu.Item key="3">Friends</Menu.Item>
						</Menu>
					</Row>
					<Card
						title="Short information"
						style={{
							marginTop: "10px",
							padding: "15px",
							textAlign: "center",
						}}
					>
						<Flex vertical gap="middle">
							{userProfile?.biography && (
								<p style={{ margin: 0 }}>{userProfile?.biography}</p>
							)}

							{(userProfile?.country || userProfile?.region) && (
								<Flex align="center" gap="small">
									<img
										src={house}
										alt="House icon"
										style={{ height: 30, width: 30 }}
									/>
									<p
										style={{ margin: 0 }}
									>{`${userProfile?.country} ${userProfile?.region}`}</p>
								</Flex>
							)}
							{userProfile?.pronouns && (
								<Flex align="center" gap="small">
									<img
										src={pronouns}
										alt="Pronouns icon (circles)"
										style={{ height: 30, width: 30 }}
									/>
									<p style={{ margin: 0 }}>{userProfile.pronouns}</p>
								</Flex>
							)}
						</Flex>
					</Card>
				</Card>
			</Row>
		</div>
	);
};

export default UserProfilePage;
