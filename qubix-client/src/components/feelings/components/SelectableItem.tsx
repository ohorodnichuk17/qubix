import { Flex } from "antd";
import React from "react";

type SelectableItemProps = {
	item: { name: string; emoji: string };
	isSelected: boolean;
	onClick: () => void;
};

const SelectableItem = React.memo(
	({ item, isSelected, onClick }: SelectableItemProps) => (
		<Flex
			className="selectable-item-flex"
			gap="small"
			align="center"
			style={{
				background: isSelected ? "gray" : "none",
				color: isSelected ? "white" : "black",
			}}
			onClick={onClick}
		>
			<img src={item.emoji} alt="Feeling/Action icon (emoji)" />
			<span>{item.name}</span>
		</Flex>
	),
	(prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected,
);

export default SelectableItem;
