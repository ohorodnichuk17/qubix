import { ColorPicker, Flex, Input } from "antd";
import { ColorValueType } from "antd/es/color-picker/interface";

type TextSettingsProps = {
    setText: React.Dispatch<React.SetStateAction<string | undefined>>;
    textColor: ColorValueType | undefined;
    setTextColor: React.Dispatch<React.SetStateAction<ColorValueType | undefined>>
}

const TextSettings = ({ setText, textColor, setTextColor }: TextSettingsProps) => {
    return (
        <Flex vertical gap="small">
            <Input.TextArea
                onChange={(e) => setText(e.target.value)} />
            <Flex align="center" gap="small">
                <span>Color:</span>

                <ColorPicker

                    format="hex"
                    value={textColor}
                    onChange={setTextColor}
                />
            </Flex>
        </Flex>
    );
}

export default TextSettings;