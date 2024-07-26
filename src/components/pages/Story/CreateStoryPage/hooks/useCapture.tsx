import { message } from "antd";
import { useRef } from "react";
import domtoimage from "dom-to-image";

const useCapture = () => {
	const captureAreaRef = useRef(null);

	const getCapture = async () => {
		if (captureAreaRef.current == null) {
			message.error("Create story error!");
			return null;
		}

		try {
			const dataUrl = await domtoimage.toJpeg(captureAreaRef.current, {
				quality: 1,
				style: { overflow: "hidden" },
			});
			const blob = dataURLToBlob(dataUrl);
			return blob;
		} catch (error) {
			message.error("Error capturing image");
			return null;
		}
	};

	const dataURLToBlob = (dataUrl: string) => {
		const arr = dataUrl.split(",");
		const mimeMatch = arr[0].match(/:(.*?);/);
		if (!mimeMatch) {
			throw new Error("Invalid data URL");
		}
		const mime = mimeMatch[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	};

	return { captureAreaRef, getCapture };
};

export default useCapture;