import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, type UploadFile } from "antd";
import "../../CreatePostModal.css";

type ImagesCarousel = {
	images: UploadFile[];
};

const ImagesCarousel = ({ images }: ImagesCarousel) => {
	return (
		<Carousel
			arrows
			draggable
			infinite
			prevArrow={<LeftOutlined />}
			nextArrow={<RightOutlined />}
		>
			{images.map((file) => (
				<img
					key={file.uid}
					src={file.preview}
					height={200}
					className="post-preview-img"
					style={{ objectFit: "contain", width: "100%" }}
					alt="Post images"
				/>
			))}
		</Carousel>
	);
};

export default ImagesCarousel;
