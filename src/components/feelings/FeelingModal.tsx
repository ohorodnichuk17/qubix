import { Flex, Modal, Tabs, type TabsProps, message } from "antd";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api/apiClient";
import { ACTION_OPTIONS, FEELING_OPTIONS } from "./constants";
import type { ISubAction, IAction, IFeeling } from "./types";
import SubActions from "./components/SubActions";

type FeelingModalProps = {
	isModalOpen: boolean;
	handleOk: (newFeeling: IFeeling | undefined) => void;
	handleChangeAction: (newAction: IAction | undefined) => void;
	handleChangeSubAction: (newAction: ISubAction | undefined) => void;
	handleCancel: () => void;
};

const FeelingModal = ({
	isModalOpen,
	handleOk,
	handleChangeAction,
	handleChangeSubAction,
	handleCancel,
}: FeelingModalProps) => {
	const [selectedFeeling, setSelectedFeeling] = useState<IFeeling>(
		FEELING_OPTIONS[0],
	);

	const [selectedAction, setSelectedAction] = useState<IAction>(
		ACTION_OPTIONS[0],
	);

	const [selectedSubAction, setSelectedSubAction] = useState<
		ISubAction | undefined
	>();

	const [isSubActionsTabOpen, setIsSubActionsTabOpen] =
		useState<boolean>(false);

	const [feelingsFromApi, setFeelingsFromApi] = useState<IFeeling[]>([]);
	const [actionsFromApi, setActionsFromApi] = useState<IAction[]>([]);
	const [subActionsFromApi, setSubActionsFromApi] = useState<ISubAction[]>([]);

	useEffect(() => {
		apiClient
			.get("/api/feeling/getAll")
			.then((res) => {
				setFeelingsFromApi(res.data);
			})
			.catch((error) => {
				console.error(error);
				message.error("Feelings loading error!");
			});
		apiClient
			.get("/api/action/getAll")
			.then((res) => {
				setActionsFromApi(res.data);
			})
			.catch((error) => {
				console.error(error);
				message.error("Actions loading error!");
			});
		apiClient
			.get("/api/subAction/getAll")
			.then((res) => {
				setSubActionsFromApi(res.data);
			})
			.catch((error) => {
				console.error(error);
				message.error("Actions loading error!");
			});
	}, []);

	const getSelectedFeelingId = () => {
		const feeling = feelingsFromApi.find(
			(feeling) => feeling.name === selectedFeeling.name,
		);
		console.log(feeling);
		if (feeling !== null && feeling !== undefined) {
			feeling.emoji = selectedFeeling.emoji;
			return feeling;
		}
	};

	const getSelectedAction = () => {
		if (selectedAction === undefined) {
			return;
		}
		console.log("selected action getSelectedAction: ", selectedAction);
		const action = actionsFromApi.find(
			(action) => action.name === selectedAction.name,
		);
		console.log("selected actionFROMapi getSelectedAction: ", action);
		if (action !== null && action !== undefined) {
			action.emoji = selectedFeeling.emoji;
			return action;
		}
	};

	const getSelectedSubAction = () => {
		if (selectedSubAction === undefined) {
			return;
		}
		console.log("selected sub-action getSelectedAction: ", selectedSubAction);
		const subAction = subActionsFromApi.find(
			(subAction) => subAction.name === selectedSubAction.name,
		);
		console.log("selected actionFROMapi getSelectedAction: ", subAction);
		if (subAction !== null && subAction !== undefined) {
			subAction.emoji = selectedFeeling.emoji;
			return subAction;
		}
	};

	const onOk = () => {
		handleOk(getSelectedFeelingId());
		handleChangeAction(getSelectedAction());
		handleChangeSubAction(getSelectedSubAction());
	};

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Feelings",
			children: (
				<Flex wrap="wrap" gap="middle">
					{FEELING_OPTIONS.map((feeling) => (
						<Flex
							key={feeling.name}
							gap="small"
							align="center"
							style={{
								width: "45%",
								padding: "5px",
								borderRadius: "8px",
								background:
									feeling.name === selectedFeeling.name ? "gray" : "none",
								color:
									feeling.name === selectedFeeling.name ? "white" : "black",
								transition: ".7s",
							}}
							onClick={() => setSelectedFeeling(feeling)}
						>
							<img
								src={feeling.emoji}
								alt="Feeling icon (emoji)"
								className="h-50px"
							/>
							<span>{feeling.name}</span>
						</Flex>
					))}
				</Flex>
			),
		},
		{
			key: "2",
			label: "Actions",
			children: (
				<Flex wrap="wrap" gap="middle">
					{isSubActionsTabOpen && (
						<SubActions
							action={selectedAction}
							setIsSubActionsTabOpen={setIsSubActionsTabOpen}
							selectedSubAction={selectedSubAction}
							setSelectedSubAction={setSelectedSubAction}
						/>
					)}
					{!isSubActionsTabOpen && (
						<>
							{ACTION_OPTIONS.map((action) => (
								<Flex
									key={action.name}
									gap="small"
									align="center"
									style={{
										width: "45%",
										padding: "5px",
										borderRadius: "8px",
										background:
											action.name === selectedAction.name ? "gray" : "none",
										color:
											action.name === selectedAction.name ? "white" : "black",
										transition: ".7s",
									}}
									onClick={() => {
										setSelectedAction(action);
										setIsSubActionsTabOpen(true);
									}}
								>
									<img
										src={action.emoji}
										alt="Feeling icon (emoji)"
										className="h-50px"
									/>
									<span>{action.name}</span>
								</Flex>
							))}
						</>
					)}
				</Flex>
			),
		},
	];

	return (
		<Modal
			title="How are you feeling ?"
			open={isModalOpen}
			onOk={onOk}
			onCancel={handleCancel}
		>
			<Tabs defaultActiveKey="1" items={items} />
		</Modal>
	);
};

export default FeelingModal;
