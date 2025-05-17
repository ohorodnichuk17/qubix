import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload/interface";
import type React from "react";
import { useEffect, useState } from "react";
import type { FileType } from "../../../../types/FileType";
import { getBase64 } from "../../../../utils/helpers/getBase64";

interface AvatarPreviewProps {
	initialImage: string;
	onImageChange: (image: string, file: File | null) => void;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({
	initialImage,
	onImageChange,
}) => {
	const [previewImage, setPreviewImage] = useState(initialImage);

	useEffect(() => {
		setPreviewImage(initialImage);
	}, [initialImage]);

	const handleAvatarChange = async (info: UploadChangeParam) => {
		const file = info.fileList[0];
		if (file && !file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}
		const image = file?.url || (file?.preview as string);
		if (image) {
			setPreviewImage(image);
			onImageChange(image, file.originFileObj as File);
		}
	};

	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			{previewImage && (
				<img
					src={previewImage}
					alt="Avatar"
					style={{
						width: "150px",
						height: "150px",
						borderRadius: "50%",
						objectFit: "cover",
						marginBottom: "10px",
					}}
				/>
			)}
			<Upload
				showUploadList={false}
				beforeUpload={() => false}
				accept="image/*"
				onChange={handleAvatarChange}
				maxCount={1}
			>
				<Button icon={<UploadOutlined />}>Upload Image</Button>
			</Upload>
		</div>
	);
};

export default AvatarPreview;
