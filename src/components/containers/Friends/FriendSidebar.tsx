import {
	UserAddOutlined,
	UserOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { Grid, Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { NavLink } from "react-router-dom";

const FriendSidebar = () => {
	const menuItems: MenuProps["items"] = [
		{
			key: "1",
			label: <NavLink to="/friends">Recommendations</NavLink>,
			icon: <UsergroupAddOutlined />,
		},
		{
			key: "2",
			label: <NavLink to="/friends/request">Friend request</NavLink>,
			icon: <UserAddOutlined />,
		},
		{
			key: "3",
			label: <NavLink to="/friends/all">All friends</NavLink>,
			icon: <UserOutlined />,
		},
	];

	const screens = Grid.useBreakpoint();
	const isScreenSmallerThatMd =
		(screens.xs || screens.sm) &&
		!screens.md &&
		!screens.lg &&
		!screens.xl &&
		!screens.xxl;

	return (
		<Sider
			width={250}
			style={{
				background: "#fff",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
			}}
			breakpoint="md"
			collapsedWidth="80"
		>
			<h2
				style={{
					textAlign: "center",
					background: "white",
					padding: "10px",
					margin: "0px",
					marginBottom: "-10px",
					borderRadius: "10px 10px 0px 0px",
					fontSize: isScreenSmallerThatMd ? "smaller" : 21,
				}}
			>
				Friends
			</h2>
			<Menu mode="inline" items={menuItems} />
		</Sider>
	);
};

export default FriendSidebar;
