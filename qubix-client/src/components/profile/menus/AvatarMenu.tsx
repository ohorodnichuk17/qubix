import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/redux";
import { autoLogin } from "../../../store/account/account.slice";
import { apiClient } from "../../../utils/api/apiClient";
import { avatarImg } from "../../../utils/images";

type AvatarMenuProps = {
	avatar: string;
	handleAvatarChange: (info: UploadChangeParam) => Promise<void>;
	setAvatar: React.Dispatch<React.SetStateAction<string>>;
};

const AvatarMenu = ({
	avatar,
	handleAvatarChange,
	setAvatar,
}: AvatarMenuProps) => {
	const { user } = useAppSelector((state) => state.account);
	const dispatch = useDispatch();

	const deleteAvatar = () => {
		if (!user?.id) {
			message.error("Cover photo deleting error");
			return;
		}

		apiClient
			.delete(`/api/user-profile/delete-avatar?userId=${user.id}`)
			.then((res) => {
				setAvatar(avatarImg);
				dispatch(autoLogin(res.data.token));
			})
			.catch(() => {
				message.error("Avatar deleting error");
			});
	};

	const menuItems = [
		{
			label: (
				<Upload
					showUploadList={false}
					beforeUpload={() => false}
					accept="image/*"
					onChange={handleAvatarChange}
					maxCount={1}
					defaultFileList={[]}
				>
					<span>Add new avatar </span>
				</Upload>
			),
			key: "1",
			icon: <CameraOutlined />,
		},
		...(avatar !== avatarImg
			? [
					{
						label: "Delete avatar",
						key: "2",
						icon: <DeleteOutlined />,
						onClick: deleteAvatar,
					},
				]
			: []),
	];

	return menuItems;
};

export default AvatarMenu;
