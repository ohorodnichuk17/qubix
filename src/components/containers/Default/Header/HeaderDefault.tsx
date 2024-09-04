import { Layout } from "antd";
import LoggedInHeader from "./LoggedInHeader";
import NotLoggedInHeader from "./NotLoggedInHeader";
import "./HeaderDefault.css";
import { useAppSelector } from "../../../../hooks/redux";

const { Header } = Layout;

const HeaderDefault = () => {
	const { isLogin } = useAppSelector((state) => state.account);

	return (
		<Header
			className="custom-header"
			style={{ position: "sticky", top: 0, zIndex: 1 }}
		>
			{isLogin ? <LoggedInHeader /> : <NotLoggedInHeader />}
		</Header>
	);
};

export default HeaderDefault;
