import { Dropdown, Grid, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { cameraImg, editImg } from "../../../utils/images";
import CoverPhotoMenu from "../menus/CoverPhotoMenu";
import { CoverButton } from "../styled";

type CoverPhotoBlockProps = {
	coverPhoto: string;
	handleCoverPhotoChange: (info: UploadChangeParam) => Promise<void>;
	setCoverPhoto: React.Dispatch<React.SetStateAction<string>>;
	isCurrentUserProfile: boolean;
};

const CoverPhotoBlock = ({
	coverPhoto,
	handleCoverPhotoChange,
	setCoverPhoto,
	isCurrentUserProfile,
}: CoverPhotoBlockProps) => {
	const screens = Grid.useBreakpoint();

	const isScreenSmallerThatMd =
		(screens.xs || screens.sm) &&
		!screens.md &&
		!screens.lg &&
		!screens.xl &&
		!screens.xxl;
	return (
		<div
			style={{
				backgroundColor: "#D9D9D9",
				height: isScreenSmallerThatMd ? "20vh" : "40vh",
				borderRadius: "10px",
				backgroundImage: `url(${coverPhoto})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				position: "relative",
			}}
		>
			{isCurrentUserProfile && (
				<>
					{coverPhoto === editImg ? (
						<Upload
							showUploadList={false}
							beforeUpload={() => false}
							accept="image/*"
							onChange={handleCoverPhotoChange}
							maxCount={1}
							defaultFileList={[]}
						>
							<CoverButton>
								<img src={cameraImg} alt="coverPhoto" />
								Add cover photo
							</CoverButton>
						</Upload>
					) : (
						<Dropdown
							menu={{
								items: CoverPhotoMenu({
									coverPhoto,
									handleCoverPhotoChange,
									setCoverPhoto,
								}),
							}}
						>
							<CoverButton>
								<img src={editImg} alt="editCoverPhoto" />
								Edit cover photo
							</CoverButton>
						</Dropdown>
					)}
				</>
			)}
		</div>
	);
};

export default CoverPhotoBlock;
