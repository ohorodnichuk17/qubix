import { Button, Flex } from "antd";
import type { IAction, ISubAction } from "../types";

type SuActionsProps = {
	action: IAction;
	selectedSubAction: ISubAction | undefined;
	setSelectedSubAction: React.Dispatch<
		React.SetStateAction<ISubAction | undefined>
	>;
	setIsSubActionsTabOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeSubAction: (newAction: ISubAction | undefined) => void;
	getSelectedSubAction: (selectedSubAction: ISubAction) => ISubAction | undefined;
};

const SubActions = ({
	action,
	selectedSubAction,
	setSelectedSubAction,
	setIsSubActionsTabOpen,
	handleChangeSubAction,
	getSelectedSubAction
}: SuActionsProps) => {
	if (action.subActions === undefined) {
		return null;
	}

	return (
		<Flex vertical style={{ width: "100%" }}>
			<Button onClick={() => setIsSubActionsTabOpen(false)}>Back</Button>
			<Flex vertical gap="middle">
				{action.subActions.map((subAction) => (
					<Flex
						key={subAction.name}
						gap="small"
						align="center"
						style={{
							width: "45%",
							padding: "5px",
							borderRadius: "8px",
							background:
								selectedSubAction === undefined
									? "none"
									: subAction.name === selectedSubAction.name
										? "gray"
										: "none",
							color:
								selectedSubAction === undefined
									? "black"
									: subAction.name === selectedSubAction.name
										? "white"
										: "black",
							transition: ".7s",
						}}
						onClick={() => { 
							setSelectedSubAction(subAction); 
							handleChangeSubAction(getSelectedSubAction(subAction))}}
					>
						<img
							src={subAction.emoji}
							alt="Feeling icon (emoji)"
							className="h-50px"
						/>
						<span>{subAction.name}</span>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};

export default SubActions;
