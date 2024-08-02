import { Grid } from "antd";
import StoryForm from "./components/StoryForm";
import PostForm from "./components/PostForm";
import "./HomePage.css";
import { useAppSelector } from "../../../hooks/redux";
import PostList from "../../post/list/PostList";
import StoryList from "../Story/list/StoryList";

export const HomePage = () => {
	const { isLogin } = useAppSelector((state) => state.account);

	const screens = Grid.useBreakpoint();

	const isScreenSmallerThatLg =
		(screens.xs || screens.sm || screens.md) &&
		!screens.lg &&
		!screens.xl &&
		!screens.xxl;

	return (
		<div
			className="homepage-container"
			style={{
				padding: isScreenSmallerThatLg ? "20px 5px" : "20px 50px",
			}}
		>
			{isLogin ? (
				<>
					<StoryList />
					<StoryForm />
					<PostForm />
					<PostList />
				</>
			) : null}
		</div>
	);
};

export default HomePage;
