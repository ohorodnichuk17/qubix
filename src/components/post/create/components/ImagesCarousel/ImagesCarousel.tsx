import { Carousel, type UploadFile } from "antd";
import "../../CreatePostModal.css";
import Arrow from "../../../../featured/Arrow/Arrow";

type ImagesCarousel = {
	images: UploadFile[];
};

const ImagesCarousel = ({ images }: ImagesCarousel) => {
	return (
		<Carousel
			arrows
			draggable
			infinite
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
	);
};

export default ImagesCarousel;
