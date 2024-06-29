import { Flex } from "antd";
import { useState } from "react";

type BackgroundOptionsProps = {
	setBackground: React.Dispatch<React.SetStateAction<string>>;
};

const BackgroundOptions = ({ setBackground }: BackgroundOptionsProps) => {
	const [selectedBackground, setSelectedBackground] = useState<string>();

	const options = [
		{
			background: "white",
		},
		{
			background: "gray",
		},
		{
			background: "black",
		},
		{
			background: "linear-gradient(180deg, #FF5733 0%, #FFC300 100%)",
		},
		{
			background: "linear-gradient(180deg, #8E44AD 0%, #3498DB 100%)",
		},
		{
			background: "linear-gradient(180deg, #16A085 0%, #F39C12 100%)",
		},
		{
			background: "linear-gradient(180deg, #E74C3C 0%, #2ECC71 100%)",
		},
		{
			background: "linear-gradient(180deg, #2C3E50 0%, #FD746C 100%)",
		},
		{
			background: "linear-gradient(180deg, #1ABC9C 0%, #2C3E50 100%)",
		},
		{
			background: "linear-gradient(180deg, #F1C40F 0%, #E67E22 100%)",
		},
		{
			background: "linear-gradient(180deg, #2980B9 0%, #6DD5FA 100%)",
		},
		{
			background: "linear-gradient(180deg, #EC6F66 0%, #F3A183 100%)",
		},
		{
			background: "linear-gradient(180deg, #FF00FF 0%, #00FFFF 100%)",
		},
		{
			background: "linear-gradient(180deg, #00FF00 0%, #0000FF 100%)",
		},
		{
			background: "linear-gradient(180deg, #00FFCC 0%, #6600FF 100%)",
		},
		{
			background: "linear-gradient(180deg, #FF0099 0%, #FFFF66 100%)",
		},
		{
			background: "linear-gradient(180deg, #33CCFF 0%, #FF99CC 100%)",
		},
		{
			background: "linear-gradient(180deg, #FFCC33 0%, #FF3366 100%)",
		},
		{
			background: "linear-gradient(180deg, #66FF66 0%, #FF3366 100%)",
		},
		{
			background: "linear-gradient(180deg, #FF6699 0%, #6699FF 100%)",
		},
		{
			background: "linear-gradient(180deg, #33FF33 0%, #FF66FF 100%)",
		},
		{
			background: "linear-gradient(180deg, #FF9966 0%, #33FFCC 100%)",
		},
		{
			background: "linear-gradient(180deg, #FF6666 0%, #33FF99 100%)",
		},
		{
			background: "linear-gradient(180deg, #FF33FF 0%, #99FF33 100%)",
		},
		{
			background: "linear-gradient(180deg, #BAFFB3 0%, #BAE1FF 100%)",
		},
		{
			background: "linear-gradient(180deg, #FFDFBA 0%, #FFFFBA 100%)",
		},
		{
			background: "linear-gradient(180deg, #BAFFC9 0%, #C9FFBA 100%)",
		},
	];

	const handleBackgroundChange = (newBackground: string) => {
		setBackground(newBackground);
		setSelectedBackground(newBackground);
	};

	const getBorderStyle = (background: string) =>
		selectedBackground === background ? "1.5px solid black" : "";

	return (
		<Flex wrap="wrap" gap="small">
			{options.map((option) => (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					key={option.background}
					className="background-option"
					style={{
						background: option.background,
						border: getBorderStyle(option.background),
					}}
					onClick={() => handleBackgroundChange(option.background)}
				/>
			))}
		</Flex>
	);
};

export default BackgroundOptions;
