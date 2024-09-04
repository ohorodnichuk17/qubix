import { Flex } from "antd";
import { useState } from "react";
import EmailConfirmationRequiredCard from "./components/EmailConfirmationRequiredCard";
import ResendEmailConfirmationCard from "./components/ResendEmailConfirmationCard";

const EmailConfirmationRequired = () => {
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
