import { Radio, Flex } from "antd";

type AudienceOptionProps = {
	value: string;
	imgSrc: string;
	imgAlt: string;
	title: string;
	description?: string;
	onClick?: () => void;
};

const AudienceOption = ({
	value,
	imgSrc,
	imgAlt,
	title,
	description,
	onClick,
}: AudienceOptionProps) => (
	<Radio value={value} onClick={onClick}>
		<Flex align="center" gap="middle">
			<div className="publication-audience-img-circle">
				<img src={imgSrc} className="h-50px" alt={imgAlt} />
			</div>
			<Flex vertical>
				<p className="publication-audience-radio-title">{title}</p>
				{description && <p>{description}</p>}
			</Flex>
		</Flex>
	</Radio>
);

export default AudienceOption;
