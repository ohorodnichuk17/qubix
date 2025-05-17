import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const AccountDeletedSuccessfullyPage = () => {
	return (
		<div>
			<Title level={2}>Account Deleted</Title>
			<Paragraph>
				Your account has been successfully deleted. Thank you for being with us.
			</Paragraph>
		</div>
	);
};

export default AccountDeletedSuccessfullyPage;
