import { Tooltip } from "antd";
import "./AddToThePublicationButton.css";

type AddToThePublicationButtonProps = {
	tooltipTitle: string;
	onClick?: () => void;
	imgSrc: string;
	imgAlt: string;
	imgStyle?: React.CSSProperties;
};

const AddToThePublicationButton = ({
	tooltipTitle,
	onClick = () => {},
	imgSrc,
	imgAlt,
	imgStyle,
}: AddToThePublicationButtonProps) => {
	return (
		<Tooltip title={tooltipTitle}>
			<button
				className="add-to-the-publication-button"
				type="button"
				onClick={onClick}
			>
				<img src={imgSrc} className="h-50px" style={imgStyle} alt={imgAlt} />
			</button>
		</Tooltip>
	);
};

export default AddToThePublicationButton;
