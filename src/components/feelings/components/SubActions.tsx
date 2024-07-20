import { Button, Flex } from "antd";
import type { IAction } from "../types";

type SuActionsProps = {
	actions: IAction;
	setSelectedAction: React.Dispatch<React.SetStateAction<IAction | undefined>>;
};

const SubActions = ({ actions, setSelectedAction }: SuActionsProps) => {

	if (actions.subActions === undefined) {
		return null;
	}

	return (
		<Flex vertical style={{ width: "100%" }}>
			<Button onClick={() => setSelectedAction(undefined)}>Back</Button>
			<Flex vertical gap="middle">
				{actions.subActions.map((action) => (
					<Flex
						key={action.name}
						gap="small"
						align="center"
						style={{
							width: "45%",
							padding: "5px",
							borderRadius: "8px",
							transition: ".7s",
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
			</Flex>
		</Flex>
	);
};

export default SubActions;