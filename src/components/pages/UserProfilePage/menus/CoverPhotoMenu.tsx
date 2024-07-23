import { CameraOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { useAppSelector } from "../../../../hooks/redux";
import { apiClient } from "../../../../utils/api/apiClient";
import { bg6 } from "../../../../utils/images";

type CoverPhotoMenuProps = {
	coverPhoto: string;
	handleCoverPhotoChange: (info: UploadChangeParam) => Promise<void>;
	setCoverPhoto: React.Dispatch<React.SetStateAction<string>>;
};

const CoverPhotoMenu = ({
	coverPhoto,
	handleCoverPhotoChange,
	setCoverPhoto,
}: CoverPhotoMenuProps) => {
	const { user } = useAppSelector((state) => state.account);
	const deleteCoverPhoto = () => {
		if (!user?.id) {
			message.error("Cover photo deleting error");
			return;
		}

		apiClient
			.delete(`/api/user-profile/delete-cover-photo?userId=${user.id}`)
			.then(() => {
				setCoverPhoto(bg6);
			})
			.catch(() => {
				message.error("Cover photo deleting error");
			});
	};

	const menuItems = [
		{
			label: (
				<Upload
					showUploadList={false}
					beforeUpload={() => false}
					accept="image/*"
					onChange={handleCoverPhotoChange}
					maxCount={1}
					defaultFileList={[]}
				>
					<span>Add new cover photo</span>
				</Upload>
			),
			key: "1",
			icon: <CameraOutlined />,
		},
		...(coverPhoto !== bg6
			? [
					{
						label: "Delete cover photo",
						key: "2",
						icon: <DeleteOutlined />,
						onClick: deleteCoverPhoto,
					},
				]
			: []),
	];
	
	return menuItems;
};

export default CoverPhotoMenu;
