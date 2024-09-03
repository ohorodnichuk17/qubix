import { Flex } from "antd";

type SelectableItemProps = {
	item: { name: string; emoji: string };
	isSelected: boolean;
	onClick: () => void;
};

const SelectableItem = ({ item, isSelected, onClick }: SelectableItemProps) => {
	return (
		<Flex
			gap="small"
			align="center"
			style={{
				width: "45%",
				padding: "5px",
				borderRadius: "8px",
				background: isSelected ? "gray" : "none",
				color: isSelected ? "white" : "black",
				transition: ".7s",
			}}
			onClick={onClick}
		>
			<img
				src={item.emoji}
				alt="Feeling/Action icon (emoji)"
				className="h-50px"
			/>
			<span>{item.name}</span>
		</Flex>
	);
};

export default SelectableItem;
