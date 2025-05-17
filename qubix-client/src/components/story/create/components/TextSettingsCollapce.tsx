import { Collapse } from "antd";
import type { ColorValueType } from "antd/es/color-picker/interface";
import TextSettings from "./TextSettings";

type TextSettingsCollapceProps = {
	setText: React.Dispatch<React.SetStateAction<string | undefined>>;
	textFontSize: string;
	setTextFontSize: React.Dispatch<React.SetStateAction<string>>;
	textColor: ColorValueType | undefined;
	setTextColor: React.Dispatch<
		React.SetStateAction<ColorValueType | undefined>
	>;
};

const TextSettingsCollapce = ({
	setText,
	textFontSize,
	setTextFontSize,
	textColor,
	setTextColor,
}: TextSettingsCollapceProps) => {
	return (
		<Collapse
			items={[
				{
					key: "1",
					label: "Text",
					children: (
						<TextSettings
							setText={setText}
							textFontSize={textFontSize}
							setTextFontSize={setTextFontSize}
							textColor={textColor}
							setTextColor={setTextColor}
						/>
					),
				},
			]}
			className="story-settings-collapce"
		/>
	);
};

export default TextSettingsCollapce;
