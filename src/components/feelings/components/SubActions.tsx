import { Button, Flex } from "antd";
import type { IAction, ISubAction } from "../types";
import SelectableItem from "./SelectableItem";

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
	onSubActionChange,
}: SuActionsProps) => {
	if (action?.subActions === undefined) {
		return null;
	}

	return (
		<Flex vertical style={{ width: "100%" }}>
			<Button onClick={() => setIsSubActionsTabOpen(false)}>Back</Button>
			<Flex vertical gap="middle">
				{action.subActions.map((subAction) => (
					<SelectableItem
						key={subAction.name}
						item={subAction}
						isSelected={subAction.name === selectedSubAction?.name}
						onClick={() => {
							onSubActionChange(subAction);
						}}
					/>
				))}
			</Flex>
		</Flex>
	);
};

export default SubActions;
