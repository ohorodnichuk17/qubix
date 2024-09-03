import { Button, Flex } from "antd";
import type { IAction, ISubAction } from "../types";

type SuActionsProps = {
	action: IAction | undefined;
	selectedSubAction: ISubAction | undefined;
	setIsSubActionsTabOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSubActionChange: (subAction: ISubAction) => void;
};

const SubActions = ({
	action,
	selectedSubAction,
	setIsSubActionsTabOpen,
	onSubActionChange
}: SuActionsProps) => {
	if (action?.subActions === undefined) {
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
						onClick={() => { onSubActionChange(subAction) }}
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
