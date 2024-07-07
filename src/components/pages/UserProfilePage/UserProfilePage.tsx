import { CameraOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Card,
	Col,
	Divider,
	Dropdown,
	Form,
	Input,
	Menu,
	message,
	Modal,
	Row,
	Select,
	Switch,
	Typography,
	Upload,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import "./UserProfilePage.css";
import type { UploadChangeParam } from "antd/es/upload";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { APP_ENV } from "../../../env";
import { useAppSelector } from "../../../hooks/redux";
import { updateAvatar } from "../../../store/account/account.slice";
import type { FileType } from "../../../types/FileType";
import { apiClient } from "../../../utils/api/apiClient";
import { getBase64 } from "../../../utils/helpers/getBase64";
import { avatar as avatarPng, cameraImg, editImg } from "../../../utils/images";
import AvatarMenu from "./components/AvatarMenu";
import CoverPhotoMenu from "./components/CoverPhotoMenu";
import { AvatarButton, CoverButton, EditButton } from "./styled";
import {
	type IUploadedFile,
	type IUserProfile,
	type IUserProfileEditModel,
	PronounsOptions,
} from "./types";

const UserProfilePage: React.FC = () => {
	const [coverPhoto, setCoverPhoto] = useState(editImg);
	const [avatar, setAvatar] = useState(avatarPng);
	const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
	const dispatch = useDispatch();
	const { isLogin, user } = useAppSelector((state) => state.account);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		if (user?.id) {
			apiClient
				.get(`/api/user-profile/get-profile-by-id?UserId=${user.id}`)
				.then((response) => {
					setUserProfile(response.data);
				})
				.catch((error) => {
					console.error("There was an error fetching the user data!", error);
				});
		}
	}, [user?.id]);

	useEffect(() => {
		if (user?.avatar !== "/images/avatars/") {
			setAvatar(APP_ENV.BASE_URL + user?.avatar);
			return;
		}
		setAvatar(avatarPng);
	}, [user?.avatar]);

	useEffect(() => {
		if (userProfile?.coverPhoto !== "") {
			setCoverPhoto(
				`${APP_ENV.BASE_URL}/images/coverPhotos/${userProfile?.coverPhoto}`,
			);
		} else {
			setCoverPhoto(editImg);
		}
	}, [userProfile?.coverPhoto]);

	const handleCoverPhotoChange = async (info: UploadChangeParam) => {
		const file = info.fileList[0];
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		setCoverPhoto(file.url || (file.preview as string));

		const formData = new FormData();

		if (user?.id) {
			formData.append("userId", user.id);
		}
		formData.append(
			"coverPhoto",
			(info.fileList[0] as IUploadedFile).originFileObj,
		);
		apiClient
			.put("/api/user-profile/edit-profile", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.error(error);
        message.error("Failed to change cover photo");
			});
	};

	const handleAvatarChange = async (info: UploadChangeParam) => {
		const file = info.fileList[0];
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		setAvatar(file.url || (file.preview as string));

		const formData = new FormData();

		if (user?.id) {
			formData.append("userId", user.id);
		}
		formData.append(
			"avatar",
			(info.fileList[0] as IUploadedFile).originFileObj,
		);
		apiClient
			.put("/api/user-profile/edit-profile", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				const newAvatar = `/images/avatars/${res.data.userEntity.avatar}`;
				dispatch(updateAvatar(newAvatar));
			})
      .catch((error) => {
        console.error(error);
        message.error("Failed to change avatar");
			});
	};

	const onFinish = (values: IUserProfileEditModel) => {
		apiClient
			.put("/api/user-profile/edit-profile", values, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res);
				setIsModalVisible(false);
			})
			.catch((error) => {
				console.error(error);
        message.error("Failed to update profile");
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	if (!isLogin) {
		return <></>;
	}

	return (
		<div style={{ backgroundColor: "#EDE0F5", padding: 0, minHeight: "100vh" }}>
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
					<Form
						name="userProfile"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						requiredMark={false}
					>
						<Form.Item
							name="coverPhoto"
							valuePropName="file"
							getValueFromEvent={(e: UploadChangeParam) => {
								const image = e?.fileList[0] as IUploadedFile;
								return image?.originFileObj;
							}}
						>
							<div
								className="box"
								style={{
									backgroundColor: "#D9D9D9",
									height: "40vh",
									borderRadius: "10px",
									backgroundImage: `url(${coverPhoto})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									position: "relative",
								}}
							>
								{coverPhoto === editImg ? (
									<Upload
										showUploadList={false}
										beforeUpload={() => false}
										accept="image/*"
										onChange={handleCoverPhotoChange}
										maxCount={1}
										defaultFileList={[]}
									>
										<CoverButton
											style={{
												display: "flex",
												alignItems: "center",
												border: "none",
												right: "0px",
												bottom: "0px",
												position: "absolute",
											}}
										>
											<img
												src={cameraImg}
												alt="coverPhoto"
												style={{ width: 26, height: 22, margin: 5 }}
											/>
											Add cover photo
										</CoverButton>
									</Upload>
								) : (
									<Dropdown
										overlay={
											<CoverPhotoMenu
												handleCoverPhotoChange={handleCoverPhotoChange}
												setCoverPhoto={setCoverPhoto}
												userCoverPhoto={userProfile?.coverPhoto}
											/>
										}
										trigger={["click"]}
									>
										<CoverButton
											style={{
												display: "flex",
												alignItems: "center",
												border: "none",
												right: "0px",
												bottom: "0px",
												position: "absolute",
											}}
										>
											<img
												src={editImg}
												alt="editCoverPhoto"
												style={{ width: 26, height: 22, margin: 5 }}
											/>
											Edit cover photo
										</CoverButton>
									</Dropdown>
								)}
							</div>
						</Form.Item>
						<Row
							style={{
								marginTop: "-7%",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Col
								xs={24}
								sm={24}
								md={8}
								lg={8}
								xl={8}
								style={{ marginBottom: "1rem" }}
							>
								<div>
									<Form.Item
										name="avatar"
										valuePropName="file"
										getValueFromEvent={(e: UploadChangeParam) => {
											const image = e?.fileList[0] as IUploadedFile;
											return image?.originFileObj;
										}}
									>
										<Avatar size={160} src={avatar} />
										<Dropdown
											overlay={
												<AvatarMenu
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
									</Form.Item>
								</div>
								<Typography style={{ margin: 10, fontSize: 26 }}>
									{user?.email}
								</Typography>
							</Col>
							<Col xs={24} sm={24} md={16} lg={16} xl={16}>
								<EditButton type="primary" onClick={showModal}>
									Edit Profile
								</EditButton>
								<Modal
									title="Edit Information"
									visible={isModalVisible}
									onOk={handleOk}
									onCancel={handleCancel}
									footer={[
										<Button
											key="cancel"
											onClick={handleCancel}
											style={{ backgroundColor: "#ff7f50", color: "white" }}
										>
											Cancel
										</Button>,
										<Button
											key="submit"
											type="primary"
											form="editProfileForm"
											htmlType="submit"
										>
											OK
										</Button>,
									]}
								>
									<Form
										layout="vertical"
										id="editProfileForm"
										onFinish={onFinish}
										onFinishFailed={onFinishFailed}
									>
										<Form.Item name="userId" hidden initialValue={user?.id} />

										<Form.Item name="biography" label="About Me">
											<Input.TextArea
												rows={4}
												placeholder="Tell about yourself..."
											/>
										</Form.Item>
										<Form.Item name="country" label="Country">
											<CountryDropdown
												value={country}
												onChange={(val) => setCountry(val)}
												classes="ant-select custom-select"
											/>
										</Form.Item>
										<Form.Item name="region" label="Region">
											<RegionDropdown
												country={country}
												value={region}
												onChange={(val) => setRegion(val)}
												classes="ant-select custom-select"
											/>
										</Form.Item>
										<Form.Item name="pronouns" label="Pronouns">
											<Select
												defaultValue="do not specify"
												options={PronounsOptions}
											/>
										</Form.Item>
										<Form.Item
											name="isBlocked"
											valuePropName="checked"
											label="Is Blocked"
										>
											<Switch />
										</Form.Item>
										<Form.Item
											name="isProfilePublic"
											valuePropName="checked"
											label="Is Profile Public"
										>
											<Switch />
										</Form.Item>
									</Form>
								</Modal>
							</Col>
						</Row>
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
							style={{
								marginTop: "10px",
								padding: "15px",
								textAlign: "center",
							}}
						>
							<Typography.Title level={4}>Short information</Typography.Title>
						</Card>
					</Form>
				</Card>
			</Row>
		</div>
	);
};

export default UserProfilePage;
