import type { ColorPickerProps } from "antd";
import type React from "react";
import {
	type ReactNode,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
import type { StoryType } from "../types";

interface CreateStoryContextProps {
	storyType: StoryType | null;
	setStoryType: React.Dispatch<React.SetStateAction<StoryType | null>>;
	image: string | undefined;
	setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
	text: string | undefined;
	setText: React.Dispatch<React.SetStateAction<string | undefined>>;
	textFontSize: string;
	setTextFontSize: React.Dispatch<React.SetStateAction<string>>;
	textColor: ColorPickerProps["value"];
	setTextColor: React.Dispatch<React.SetStateAction<ColorPickerProps["value"]>>;
	textColorString: string;
	background: string;
	setBackground: React.Dispatch<React.SetStateAction<string>>;
	width: number;
	setWidth: React.Dispatch<React.SetStateAction<number>>;
	rotate: number;
	setRotate: React.Dispatch<React.SetStateAction<number>>;
	handleImageWidthChange: (value: number) => void;
	handleImageRotateChange: (value: number) => void;
}

const CreateStoryContext = createContext<CreateStoryContextProps | undefined>(
	undefined,
);

export const CreateStoryProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [storyType, setStoryType] = useState<StoryType | null>(null);
	const [image, setImage] = useState<string>();
	const [text, setText] = useState<string>();
	const [textFontSize, setTextFontSize] = useState<string>("16");
	const [textColor, setTextColor] =
		useState<ColorPickerProps["value"]>("black");
	const textColorString = useMemo(() => {
		if (typeof textColor === "string") {
			return textColor;
		}
		if (textColor) {
			return textColor.toHexString();
		}
		return "black";
	}, [textColor]);
	const [background, setBackground] = useState<string>("gray");
	const [width, setWidth] = useState<number>(30);
	const [rotate, setRotate] = useState<number>(0);

	const handleImageWidthChange = (value: number) => setWidth(value);
	const handleImageRotateChange = (value: number) => setRotate(value);

	const value = {
		storyType,
		setStoryType,
		image,
		setImage,
		text,
		setText,
		textFontSize,
		setTextFontSize,
		textColor,
		setTextColor,
		textColorString,
		background,
		setBackground,
		width,
		setWidth,
		rotate,
		setRotate,
		handleImageWidthChange,
		handleImageRotateChange,
	};

	return (
		<CreateStoryContext.Provider value={value}>
			{children}
		</CreateStoryContext.Provider>
	);
};

export const useCreateStory = () => {
	const context = useContext(CreateStoryContext);
	if (context === undefined) {
		throw new Error("useCreateStory must be used within a CreateStoryProvider");
	}
	return context;
};
