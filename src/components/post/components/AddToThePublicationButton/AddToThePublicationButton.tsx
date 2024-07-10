import { Tooltip } from "antd";
import "./AddToThePublicationButton.module.css";

type AddToThePublicationButtonProps = {
	tooltioTitle: string;
	onClick?: () => void;
	imgSrc: string;
	imgAlt: string;
	imgStyle?: React.CSSProperties;
};

const AddToThePublicationButton = ({
	tooltioTitle,
	onClick = () => {},
	imgSrc,
	imgAlt,
	imgStyle,
}: AddToThePublicationButtonProps) => {
	return (
		<Tooltip title={tooltioTitle}>
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
