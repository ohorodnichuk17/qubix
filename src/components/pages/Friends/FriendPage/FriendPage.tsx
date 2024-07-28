import { Grid, Layout } from "antd";
import FriendRecommendationsPage from "./FriendRecommendationsPage";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const FriendPage = () => {
	const screens = useBreakpoint();

	return (
		<div>
			<Layout
				style={{
					marginLeft: screens.xs ? 80 : 256,
					transition: "margin-left 0.2s",
				}}
			>
				<Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
					<FriendRecommendationsPage />
				</Content>
			</Layout>
		</div>
	);
};

export default FriendPage;
