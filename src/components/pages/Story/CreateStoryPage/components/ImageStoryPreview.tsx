import { Card } from "antd";
import Draggable from 'react-draggable';

type ImageStoryPreviewProps = {
    width: number;
    rotate: number;
    image: string | undefined;
    background: string;
    captureAreaRef: React.MutableRefObject<null>
}

const ImageStoryPreview = ({ width, rotate, image, background, captureAreaRef }: ImageStoryPreviewProps) => {
    return (
        <Card title="Preview" style={{ width: '100%' }}>
            <div className="preview-div" style={{ background: background }}>
                <div ref={captureAreaRef} style={{ background: background }}>
                    <div className="preview-div-bordered" >
                        <Draggable>
                            <img alt="Your story image" style={{ width: `${width}%`, rotate: `${rotate}deg` }} src={image} />
                        </Draggable>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ImageStoryPreview;