import { Button, Form, Input, Modal, Select, Switch, message } from "antd";
import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IUserProfile, IUserProfileEditModel } from "../types";
import { PronounsOptions } from "../constants";

type EditProfileModalProps = {
	isModalVisible: boolean;
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	userProfile: IUserProfile | null;
};

const EditProfileModal = ({
	isModalVisible,
	setIsModalVisible,
	userProfile,
}: EditProfileModalProps) => {
	const { user } = useAppSelector((state) => state.account);

	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");

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

	return (
		<Modal
			title="Edit Information"
			open={isModalVisible}
			onCancel={() => setIsModalVisible(false)}
			footer={[
				<Button
					key="cancel"
					onClick={() => setIsModalVisible(false)}
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
				initialValues={userProfile ? userProfile : []}
			>
				<Form.Item name="userId" hidden initialValue={user?.id} />

				<Form.Item name="biography" label="About Me">
					<Input.TextArea rows={4} placeholder="Tell about yourself..." />
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
					<Select defaultValue="do not specify" options={PronounsOptions} />
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
	);
};

export default EditProfileModal;
