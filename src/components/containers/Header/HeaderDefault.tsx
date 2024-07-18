import { useAppSelector } from "../../../hooks/redux";
import { Layout } from "antd";
import LoggedInHeader from "./LoggedInHeader";
import NotLoggedInHeader from "./NotLoggedInHeader";
import "./HeaderDefault.css";

const { Header } = Layout;

const HeaderDefault = () => {
	const { isLogin } = useAppSelector((state) => state.account);

	return (
		<Header className="custom-header">
			{isLogin ? <LoggedInHeader /> : <NotLoggedInHeader />}
		</Header>
	);
};

export default HeaderDefault;
