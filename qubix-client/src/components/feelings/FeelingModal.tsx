import { Flex, Modal, Tabs, type TabsProps, message } from "antd";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api/apiClient";
import SelectableItem from "./components/SelectableItem";
import SubActions from "./components/SubActions";
import { ACTION_OPTIONS, FEELING_OPTIONS } from "./constants";
import type { IAction, IFeeling, ISubAction } from "./types";
import getSelectedItem from "./utils/getSelectedItem";

type FeelingModalProps = {
	isModalOpen: boolean;
	selectedTab: "feelings" | "actions";
	handleOk: (newFeeling: IFeeling | undefined) => void;
	handleChangeAction: (newAction: IAction | undefined) => void;
	handleChangeSubAction: (newAction: ISubAction | undefined) => void;
	handleCancel: () => void;
};

const FeelingModal = ({
	isModalOpen,
	selectedTab,
	handleOk,
	handleChangeAction,
	handleChangeSubAction,
	handleCancel,
}: FeelingModalProps) => {
	const [activeKey, setActiveKey] = useState<"feelings" | "actions">(
		selectedTab,
	);

	const [selectedFeeling, setSelectedFeeling] = useState<IFeeling>();
	const [selectedAction, setSelectedAction] = useState<IAction>();
	const [selectedSubAction, setSelectedSubAction] = useState<ISubAction>();

	const [isSubActionsTabOpen, setIsSubActionsTabOpen] =
		useState<boolean>(false);

	const [feelingsFromApi, setFeelingsFromApi] = useState<IFeeling[]>([]);
	const [actionsFromApi, setActionsFromApi] = useState<IAction[]>([]);
	const [subActionsFromApi, setSubActionsFromApi] = useState<ISubAction[]>([]);

	useEffect(() => {
		setActiveKey(selectedTab);
	}, [selectedTab]);

	useEffect(() => {
		Promise.all([
			apiClient.get("/api/feeling/getAll"),
			apiClient.get("/api/action/getAll"),
			apiClient.get("/api/subAction/getAll"),
		])
			.then(([feelingsRes, actionsRes, subActionsRes]) => {
				setFeelingsFromApi(feelingsRes.data);
				setActionsFromApi(actionsRes.data);
				setSubActionsFromApi(subActionsRes.data);
			})
			.catch(() => {
				message.error("Error loading data!");
			});
	}, []);

	const onActionChange = (action: IAction) => {
		setSelectedAction(action);
		setIsSubActionsTabOpen(true);
		handleChangeAction(getSelectedItem(action, actionsFromApi));
	};

	const onSubActionChange = (subAction: ISubAction) => {
		setSelectedSubAction(subAction);
		handleChangeSubAction(getSelectedItem(subAction, subActionsFromApi));
	};

	const onOk = () => {
		handleChangeSubAction(
			getSelectedItem(selectedSubAction, subActionsFromApi),
		);
		handleChangeAction(getSelectedItem(selectedAction, actionsFromApi));
		handleOk(getSelectedItem(selectedFeeling, feelingsFromApi));
	};

	const items: TabsProps["items"] = [
		{
			key: "feelings",
			label: "Feelings",
			children: (
				<Flex wrap="wrap" gap="middle">
					{FEELING_OPTIONS.map((feeling) => (
						<SelectableItem
							key={feeling.name}
							item={feeling}
							isSelected={feeling.name === selectedFeeling?.name}
							onClick={() => {
								setSelectedFeeling(feeling);
							}}
						/>
					))}
				</Flex>
			),
		},
		{
			key: "actions",
			label: "Actions",
			children: (
				<Flex wrap="wrap" gap="middle">
					{isSubActionsTabOpen && (
						<SubActions
							action={selectedAction}
							setIsSubActionsTabOpen={setIsSubActionsTabOpen}
							selectedSubAction={selectedSubAction}
							onSubActionChange={onSubActionChange}
						/>
					)}
					{!isSubActionsTabOpen && (
						<>
							{ACTION_OPTIONS.map((action) => (
								<SelectableItem
									key={action.name}
									item={action}
									isSelected={action.name === selectedAction?.name}
									onClick={() => {
										onActionChange(action);
									}}
								/>
							))}
						</>
					)}
				</Flex>
			),
		},
	];

	const changeTab = (activeKey: string) =>
		setActiveKey(activeKey as "feelings" | "actions");

	return (
		<Modal
			title="How are you feeling ?"
			open={isModalOpen}
			onOk={onOk}
			onCancel={handleCancel}
		>
			<Tabs activeKey={activeKey} onChange={changeTab} items={items} />
		</Modal>
	);
};

export default FeelingModal;
