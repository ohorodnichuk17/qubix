import { Flex } from "antd";
import type { PostVisibility } from "../../types";
import { VISIBILITY_OPTIONS } from "./constants";

type VisibilityButtonProps = {
	visibility: PostVisibility;
	setVisibilityModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const VisibilityButton = ({
	visibility,
	setVisibilityModalVisible,
}: VisibilityButtonProps) => {
	return (
		<button
			type="button"
			className="visibility-button"
			onClick={() => setVisibilityModalVisible(true)}
		>
			<Flex align="center" gap="small">
				<img
					src={
						VISIBILITY_OPTIONS.find((o) => o.visibility === visibility)?.icon
					}
					style={{ height: 15, width: 15 }}
					alt="Visibility icon"
				/>
				<p style={{ margin: 0 }}>
					{VISIBILITY_OPTIONS.find((o) => o.visibility === visibility)?.title}
				</p>
			</Flex>
		</button>
	);
};

export default VisibilityButton;
