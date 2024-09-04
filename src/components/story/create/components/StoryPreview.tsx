import { Card, Flex } from "antd";
import Draggable from "react-draggable";
import { useCreateStory } from "../context";

type StoryPreviewProps = {
	captureAreaRef: React.MutableRefObject<null>;
};

const StoryPreview = ({ captureAreaRef }: StoryPreviewProps) => {
	const {
		storyType,
		image,
		text,
		textFontSize,
		textColorString,
		background,
		width,
		rotate,
	} = useCreateStory();

	return (
		<Card title="Preview" style={{ width: "100%" }}>
			<div className="preview-div" style={{ background: background }}>
				<div
					ref={captureAreaRef}
					style={{ background: background }}
					className="preview-div-bordered"
				>
					{storyType === "image" && (
						<>
							<Draggable>
								<img
									alt="Your story"
									style={{ width: `${width}%`, rotate: `${rotate}deg` }}
									src={image}
								/>
							</Draggable>
							<Draggable>
								<p style={{ cursor: "pointer", color: `${textColorString}` }}>
									{text}
								</p>
							</Draggable>
						</>
					)}
					{storyType === "text" && (
						<Flex
							justify="center"
							align="center"
							style={{ height: "100%", width: "100%", margin: "0 auto" }}
						>
							<p
								style={{
									color: `${textColorString}`,
									fontSize: `${textFontSize}px`,
									maxWidth: "90%",
									wordBreak: "break-all",
								}}
							>
								{text}
							</p>
						</Flex>
					)}
				</div>
			</div>
		</Card>
	);
};

export default StoryPreview;
