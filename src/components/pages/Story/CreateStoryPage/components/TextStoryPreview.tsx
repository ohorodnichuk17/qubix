import { Card, Flex } from "antd";

type TextStoryPreviewProps = {
    text: string | undefined;
    textFontSize: string;
    textColorString: string | undefined;
    background: string;
    captureAreaRef: React.MutableRefObject<null>
}

const TextStoryPreview = ({ text, textFontSize, textColorString, background, captureAreaRef }: TextStoryPreviewProps) => {
    return (
        <Card title="Preview" style={{ width: '100%' }}>
            <div className="preview-div" style={{ background: background }}>
                <div ref={captureAreaRef} style={{ background: background }}>
                    <div className="preview-div-bordered">
                        <Flex justify="center" align="center" style={{ height: '100%', width: '90%',margin:'0 auto' }}>
                            <p style={{ color: `${textColorString}`, fontSize: `${textFontSize}px`,maxWidth:'90%' }}>{text}</p>
                        </Flex>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default TextStoryPreview;