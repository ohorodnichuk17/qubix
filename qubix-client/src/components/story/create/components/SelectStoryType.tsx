import { imageStoryIcon, textStoryIcon } from "../../../../utils/images";
import type { StoryType } from "../types";

type SelectStoryProps = {
	setStoryType: (value: React.SetStateAction<StoryType | null>) => void;
};

const SelectStoryType = ({ setStoryType }: SelectStoryProps) => (
	<>
		<div className="create-story-div" onClick={() => setStoryType("image")}>
			<div className="create-story-image-div">
				<img src={imageStoryIcon} alt="Create story with image icon" />
			</div>
			<p className="create-story-label">Create story with photo</p>
		</div>
		<div className="create-story-div" onClick={() => setStoryType("text")}>
			<div className="create-story-image-div">
				<img src={textStoryIcon} alt="Create story with text icon" />
			</div>
			<p className="create-story-label">Create text story</p>
		</div>
	</>
);

export default SelectStoryType;
