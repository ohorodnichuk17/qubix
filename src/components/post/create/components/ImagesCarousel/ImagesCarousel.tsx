import { Carousel, Flex, Tooltip, type UploadFile } from "antd";
import "../../CreatePostModal.css";
import Arrow from "../../../../featured/Arrow/Arrow";
import { DeleteTwoTone } from "@ant-design/icons";
import { useState } from "react";

type ImagesCarousel = {
	images: UploadFile[];
	setImages: React.Dispatch<React.SetStateAction<UploadFile[]>>
};

const ImagesCarousel = ({ images, setImages }: ImagesCarousel) => {
	const [currentImage, setCurrentImage] = useState<number>(0);
	const onChange = (current: number) => setCurrentImage(current)
	const deleteCurrentImage = () => {
		setImages(images.filter(image => image.uid !== images[currentImage].uid));
	}
	return (
		<>
			<Flex justify="end">
				<Tooltip title="Delete current image">
					<DeleteTwoTone onClick={deleteCurrentImage} className="comment-icon" />
				</Tooltip>
			</Flex>
			<Carousel
				arrows
				draggable
				infinite
				afterChange={onChange}
				nextArrow={<Arrow direction="right" />}
				prevArrow={<Arrow direction="left" />}
			>
				{images.map((file) => (
					<img
						key={file.uid}
						src={file.preview}
						height={200}
						className="post-preview-img"
						alt="Post images"
					/>
				))}
			</Carousel>
		</>
	);
};

export default ImagesCarousel;
