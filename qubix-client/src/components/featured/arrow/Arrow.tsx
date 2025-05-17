import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface AntdArrowProps {
	currentSlide?: number;
	slideCount?: number;
}

interface ArrowProps {
	direction: "left" | "right";
}

const Arrow = ({
	currentSlide,
	direction,
	slideCount,
	...carouselProps
}: ArrowProps & AntdArrowProps) =>
	direction === "left" ? (
		<LeftOutlined {...carouselProps} />
	) : (
		<RightOutlined {...carouselProps} />
	);

export default Arrow;
