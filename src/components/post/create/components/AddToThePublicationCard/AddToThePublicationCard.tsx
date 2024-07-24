import { Card, Flex, Upload, type UploadFile } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import { locationImg, photoImg, tagImg } from "../../../../../utils/images";
import type { PostType } from "../../types";
import AddToThePublicationButton from "../AddToThePublicationButton/AddToThePublicationButton";

type AddToThePublicationProps = {
	postType: PostType;
	handleLocationInputVisibilityChange: () => void;
	handleTagsInputVisibilityChange: () => void;
	handleFeelingModalVisibilityChange: () => void;
	handleImagesChange:
		| ((info: UploadChangeParam<UploadFile>) => void)
		| undefined;
	feelingEmoji: string;
};

const AddToThePublicationCard = ({
	postType,
	handleLocationInputVisibilityChange,
	handleTagsInputVisibilityChange,
	handleFeelingModalVisibilityChange,
	handleImagesChange,
	feelingEmoji,
}: AddToThePublicationProps) => {
	return (
		<Card title="Add to the publication">
			<Flex>
				{postType === "image" && (
					<Upload
						beforeUpload={() => false}
						multiple
						showUploadList={false}
						onChange={handleImagesChange}
					>
						<AddToThePublicationButton
							tooltipTitle="Image"
							imgSrc={photoImg}
							imgAlt="Add images icon (camera)"
						/>
					</Upload>
				)}
				<AddToThePublicationButton
					tooltipTitle="Location"
					onClick={handleLocationInputVisibilityChange}
					imgSrc={locationImg}
					imgAlt="location icon"
				/>
				<AddToThePublicationButton
					tooltipTitle="#"
					onClick={handleTagsInputVisibilityChange}
					imgSrc={tagImg}
					imgAlt="Add tags icon"
				/>
				<AddToThePublicationButton
					tooltipTitle="Feeling/Action"
					onClick={handleFeelingModalVisibilityChange}
					imgSrc={feelingEmoji}
					imgAlt="Change feeling icon (happy smile)"
				/>
			</Flex>
		</Card>
	);
};

export default AddToThePublicationCard;
