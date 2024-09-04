import { message } from "antd";
import domtoimage from "dom-to-image";
import { useRef } from "react";

const useCapture = () => {
	const captureAreaRef = useRef(null);

	const getCapture = async () => {
		if (captureAreaRef.current == null) {
			message.error("Create story error!");
			return null;
		}

		const captureDiv = captureAreaRef.current as HTMLDivElement;
		captureDiv.style.border = "none";

		const captureDivWidth = captureDiv.offsetWidth;
		const captureDivHeight = captureDiv.offsetHeight;
		const scale = 5.5;

		const clone = captureDiv.cloneNode(true) as HTMLDivElement;

		const cloneContents = clone.innerHTML;
		clone.innerHTML = "";
		clone.style.position = "absolute";
		clone.style.top = "0";
		clone.style.left = "0";
		clone.style.width = `${captureDiv.offsetWidth * scale}px`;
		clone.style.height = `${captureDiv.offsetHeight * scale}px`;
		clone.style.overflow = "hidden";

		const contentsDiv = document.createElement("div");
		contentsDiv.innerHTML = cloneContents;
		contentsDiv.style.transform = `scale(${scale})`;
		contentsDiv.style.transformOrigin = "top left";
		contentsDiv.style.width = `${captureDiv.offsetWidth}px`;
		contentsDiv.style.height = `${captureDiv.offsetHeight}px`;

		clone.appendChild(contentsDiv);

		document.body.appendChild(clone);

		try {
			const dataUrl = await domtoimage.toJpeg(clone, {
				width: captureDivWidth * scale,
				height: captureDivHeight * scale,
				quality: 1,
				style: {
					overflow: "hidden",
				},
			});
			document.body.removeChild(clone);
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
