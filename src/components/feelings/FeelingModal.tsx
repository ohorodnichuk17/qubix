import { Flex, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api/apiClient";
import { FEELING_OPTIONS } from "./constants";
import type { IFeeling } from "./types";

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

	return (
		<Modal
			title="How are you feeling ?"
			open={isModalOpen}
			onOk={() => handleOk(getSelectedFeelingId())}
			onCancel={handleCancel}
		>
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
							color: feeling.name === selectedFeeling.name ? "white" : "black",
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
		</Modal>
	);
};

export default FeelingModal;
