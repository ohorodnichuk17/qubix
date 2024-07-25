import { Grid, Layout } from "antd";
import SideBar from "../../containers/SideBar/SideBar";
import StoryForm from "./components/StoryForm";
import PostForm from "./components/PostForm";
import "./HomePage.css";
import { useAppSelector } from "../../../hooks/redux";
import PostList from "../../post/list/PostList";

const { Content } = Layout;

export const HomePage = () => {
	const { isLogin } = useAppSelector((state) => state.account);

	const screens = Grid.useBreakpoint();

	const isScreenSmallerThatMd =
		(screens.xs || screens.sm) &&
		!screens.md &&
		!screens.lg &&
		!screens.xl &&
		!screens.xxl;

	return (
		<Layout>
			<SideBar />
			<Layout style={{ marginLeft: isScreenSmallerThatMd ? 0 : 250 }}>
				<Content
					style={{
						padding: isScreenSmallerThatMd ? "0 5px" : "0 50px",
						marginTop: 64,
					}}
				>
					<div className="homepage-container">
						{isLogin ? (
							<>
								<StoryForm />
								<PostForm />
								<PostList />
							</>
						) : null}
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default HomePage;
