import { Collapse } from "antd";
import TextSettings from "./TextSettings";
import { ColorValueType } from "antd/es/color-picker/interface";

type TextSettingsCollapceProps = {
    setText: React.Dispatch<React.SetStateAction<string | undefined>>;
    textColor: ColorValueType | undefined;
    setTextColor: React.Dispatch<React.SetStateAction<ColorValueType | undefined>>
}

const TextSettingsCollapce = ({ setText, textColor, setTextColor }: TextSettingsCollapceProps) => {
    return (
        <Collapse items={[
            {
                key: '1',
                label: 'Text',
                children: <TextSettings setText={setText} textColor={textColor} setTextColor={setTextColor} />
            }]} style={{ maxWidth: '250px' }} />
    );
}

export default TextSettingsCollapce;