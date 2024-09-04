import { Flex, Radio } from "antd";

type VisibilityOptionProps = {
	value: string;
	imgSrc: string;
	imgAlt: string;
	title: string;
	description?: string;
	onClick?: () => void;
};

const VisibilityOption = ({
	value,
	imgSrc,
	imgAlt,
	title,
	description,
	onClick,
}: VisibilityOptionProps) => (
	<Radio value={value} onClick={onClick}>
		<Flex align="center" gap="middle">
			<div className="publication-visibility-img-circle">
				<img src={imgSrc} className="h-50px" alt={imgAlt} />
			</div>
			<Flex vertical>
				<p className="publication-visibility-radio-title">{title}</p>
				{description && <p>{description}</p>}
			</Flex>
		</Flex>
	</Radio>
);

export default VisibilityOption;
