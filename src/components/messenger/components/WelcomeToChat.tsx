import { Typography } from "antd";
import { messageImg } from "../../../utils/images";

const WelcomeToChat = () => (
	<>
		<div
			style={{
				fontSize: "48px",
				color: "#8c8c8c",
				marginBottom: "16px",
				textAlign: "center",
				width: "100%",
			}}
		>
			<img src={messageImg} width={100} alt="message" />
		</div>
		<Typography.Title
			level={4}
			style={{ color: "#8c8c8c", textAlign: "center", width: "100%" }}
		>
			Your messages
		</Typography.Title>
		<p style={{ color: "#8c8c8c", textAlign: "center", width: "100%" }}>
			Select a chat to view messages
		</p>
	</>
);

export default WelcomeToChat;
