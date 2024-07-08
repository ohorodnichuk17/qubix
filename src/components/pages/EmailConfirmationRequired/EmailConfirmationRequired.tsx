import { Flex } from "antd";
import type React from "react";
import { useState } from "react";
import EmailConfirmationRequiredCard from "./components/EmailConfirmationRequiredCard";
import ResendEmailConfirmationCard from "./components/ResendEmailConfirmationCard";

const EmailConfirmationRequired: React.FC = () => {
	const [
		isVisibleResendEmailConfirmationForm,
		setIsVisibleResendEmailConfirmationForm,
	] = useState<boolean>(false);

	return (
		<Flex
			vertical
			gap="small"
			align="center"
			justify="center"
			style={{ height: "100%" }}
		>
			{!isVisibleResendEmailConfirmationForm && (
				<EmailConfirmationRequiredCard
					setIsVisibleResendEmailConfirmationForm={
						setIsVisibleResendEmailConfirmationForm
					}
				/>
			)}
			{isVisibleResendEmailConfirmationForm && <ResendEmailConfirmationCard />}
		</Flex>
	);
};

export default EmailConfirmationRequired;
