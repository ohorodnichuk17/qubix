import { Dropdown, Grid, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { cameraImg, editImg } from "../../../../utils/images";
import { CoverButton } from "../styled";
import CoverPhotoMenu from "../menus/CoverPhotoMenu";

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
							menu={{
								items: CoverPhotoMenu({
									coverPhoto,
									handleCoverPhotoChange,
									setCoverPhoto,
								}),
							}}
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
				</>
			)}
		</div>
	);
};

export default CoverPhotoBlock;
