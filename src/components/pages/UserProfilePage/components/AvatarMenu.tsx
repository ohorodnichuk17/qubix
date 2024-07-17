import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { Menu, Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../hooks/redux";
import { updateAvatar } from "../../../../store/account/account.slice";
import { apiClient } from "../../../../utils/api/apiClient";
import { avatar as defaultAvatar } from "../../../../utils/images";

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
			.then(() => {
				setAvatar(defaultAvatar);
				dispatch(updateAvatar(""));
			})
			.catch(() => {
				message.error("Avatar deleting error");
			});
	};

	return (
		<Menu>
			<Upload
				showUploadList={false}
				beforeUpload={() => false}
				accept="image/*"
				onChange={handleAvatarChange}
				maxCount={1}
				defaultFileList={[]}
			>
				<Menu.Item key="1" icon={<CameraOutlined />}>
					<span>Add new avatar</span>
				</Menu.Item>
			</Upload>
			{avatar !== defaultAvatar && (
				<Menu.Item key="2" icon={<DeleteOutlined />} onClick={deleteAvatar}>
					Delete avatar
				</Menu.Item>
			)}
		</Menu>
	);
};

export default AvatarMenu;
