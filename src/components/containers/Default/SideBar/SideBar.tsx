import { Avatar, Grid, Layout, Menu, type MenuProps, message } from "antd";
import { Link } from "react-router-dom";

import "./SideBar.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import useAvatar from "../../../../hooks/useAvatar";
import { apiClient } from "../../../../utils/api/apiClient";
import {
	action as actionImg,
	createPost,
	feeling,
	friendsForSidePanel,
	memories,
	messengerForSidePanel,
} from "../../../../utils/images";
import FeelingModal from "../../../feelings/FeelingModal";
import type { IAction, IFeeling, ISubAction } from "../../../feelings/types";
import CreatePostModal from "../../../post/create/CreatePostModal";
const { useBreakpoint } = Grid;

const { Sider } = Layout;

export const SideBar = () => {
	const { user, isLogin } = useAppSelector((state) => state.account);
	const avatarImg = useAvatar();
	const screens = useBreakpoint();
	const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
	const [isFeelingModalOpen, setIsFeelingModalOpen] = useState(false);

	const [action, setAction] = useState<IAction>();
	const [subAction, setSubAction] = useState<ISubAction>();

	const [modalType, setModalType] = useState<"feelings" | "actions">(
		"feelings",
	);

	useEffect(() => {
		console.log(action);
	}, [action]);

	const handleChangeAction = (newAction: IAction | undefined) => {
		setAction(newAction);
	};

	const handleChangeSubAction = (newAction: ISubAction | undefined) => {
		setSubAction(newAction);
	};

	if (!isLogin) {
		return null;
	}

	const showCreatePostModal = () => setIsCreatePostModalOpen(true);
	const handleCreatePostOk = () => setIsCreatePostModalOpen(false);
	const handleCreatePostCancel = () => setIsCreatePostModalOpen(false);

	const showFeelingModal = () => setIsFeelingModalOpen(true);
	const hideFeelingModal = () => setIsFeelingModalOpen(false);

	const handleFeelingOk = async (feeling: IFeeling | undefined) => {
		if (!modalType) return;

		const formData = new FormData();
		formData.append("visibility", "public");

		if (modalType === "feelings" && feeling?.id) {
			formData.append("feelingId", feeling?.id);
		}
		if (modalType === "actions") {
			if (action && action.id !== undefined) {
				formData.append("actionId", action.id);
			}

			if (subAction && subAction.id !== undefined) {
				formData.append("subActionId", subAction.id);
			}
		}
		try {
			await apiClient.post("/api/post/create", formData);
			message.success("Feeling successfully posted!", 0.5).then(() => {
				window.location.reload();
			});
		} catch {
			message.error("Post feeling error!");
		}
		setIsFeelingModalOpen(false);
	};

	const isScreenSmallerThatMd =
		(screens.xs || screens.sm) &&
		!screens.md &&
		!screens.lg &&
		!screens.xl &&
		!screens.xxl;

	const menuItems: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<Link to="/messenger" className="menu-link">
					Messenger
				</Link>
			),
			icon: (
				<img
					src={messengerForSidePanel}
					alt="Messenger"
					className="menu-icon"
				/>
			),
		},
		{
			key: "2",
			label: (
				<Link to="/friends" className="menu-link">
					Search Friends
				</Link>
			),
			icon: (
				<img
					src={friendsForSidePanel}
					alt="Search Friends"
					className="menu-icon"
				/>
			),
		},
		{
			key: "3",
			label: (
				<Link to="/memories" className="menu-link">
					Memories
				</Link>
			),
			icon: <img src={memories} alt="Memories" className="menu-icon" />,
		},
		{
			key: "4",
			label: "Feelings",
			icon: <img src={feeling} alt="Feelings" className="menu-icon" />,
			onClick: () => {
				setModalType("feelings");
				showFeelingModal();
			},
		},
		{
			key: "5",
			label: "Actions",
			icon: <img src={actionImg} alt="Actions" className="menu-icon" />,
			onClick: () => {
				setModalType("actions");
				showFeelingModal();
			},
		},
		{
			key: "6",
			label: "Create post",
			icon: <img src={createPost} alt="Create Post" className="menu-icon" />,
			onClick: showCreatePostModal,
		},
	];

	return (
		<Sider
			width={250}
			style={{
				background: "#fff",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
				scrollbarWidth: "thin",
				scrollbarColor: "unset",
			}}
			breakpoint="md"
			collapsedWidth="80"
		>
			<div
				style={{
					position: "fixed",
					top: 64,
					width: "100%",
					maxWidth: isScreenSmallerThatMd ? 80 : 250,
					paddingTop: isScreenSmallerThatMd ? 10 : 0,
				}}
			>
				{!isScreenSmallerThatMd && (
					<div className="avatar-container">
						<Link to="/profile" style={{ color: "black" }}>
							<Avatar src={avatarImg} size={50} />
							<span
								className="user-name"
								style={{ color: "black", marginLeft: "8px" }}
							>
								{user?.firstName}
							</span>{" "}
							<span className="user-name" style={{ color: "black" }}>
								{user?.lastName}
							</span>
						</Link>
					</div>
				)}
				<Menu
					mode="inline"
					style={{ height: "100%", borderRight: 0 }}
					items={menuItems}
				/>
				<CreatePostModal
					isModalOpen={isCreatePostModalOpen}
					handleOk={handleCreatePostOk}
					handleCancel={handleCreatePostCancel}
				/>
				<FeelingModal
					isModalOpen={isFeelingModalOpen}
					selectedTab={modalType}
					handleOk={handleFeelingOk}
					handleChangeAction={handleChangeAction}
					handleChangeSubAction={handleChangeSubAction}
					handleCancel={hideFeelingModal}
				/>
			</div>
		</Sider>
	);
};

export default SideBar;
