import { Flex, Modal, Tabs, type TabsProps, message } from "antd";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api/apiClient";
import { ACTION_OPTIONS, FEELING_OPTIONS } from "./constants";
import type { IAction, IFeeling } from "./types";
import SubActions from "./components/SubActions";

type FeelingModalProps = {
	isModalOpen: boolean;
	handleOk: (newFeeling: IFeeling | undefined) => void;
	handleCancel: () => void;
};

const FeelingModal = ({
	isModalOpen,
	handleOk,
	handleCancel,
}: FeelingModalProps) => {
	const [selectedFeeling, setSelectedFeeling] = useState<IFeeling>(
		FEELING_OPTIONS[0],
	);

	const [selectedAction, setSelectedAction] = useState<IAction>();

	const [feelingsFromApi, setFeelingsFromApi] = useState<IFeeling[]>([]);

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
					{selectedAction !== undefined && (
						<SubActions
							actions={selectedAction}
							setSelectedAction={setSelectedAction}
						/>
					)}
					{selectedAction === undefined && (
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
											action.name === selectedFeeling.name ? "gray" : "none",
										color:
											action.name === selectedFeeling.name ? "white" : "black",
										transition: ".7s",
									}}
									onClick={() => setSelectedAction(action)}
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
			onOk={() => handleOk(getSelectedFeelingId())}
			onCancel={handleCancel}
		>
			<Tabs defaultActiveKey="1" items={items} />
		</Modal>
	);
};

export default FeelingModal;
