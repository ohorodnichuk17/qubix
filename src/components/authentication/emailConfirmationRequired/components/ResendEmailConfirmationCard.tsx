import { MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { apiClient } from "../../../../utils/api/apiClient";
import type { ResendEmailConfirmationModel } from "../types";

const ResendEmailConfirmationCard = () => {
	const onFinish = (values: ResendEmailConfirmationModel) => {
		apiClient
			.get(
				`/api/authentication/resend-confirmation-email?Email=${values.email}`,
			)
			.then(() => {
				message.success("Confirmation email resent successfully");
				window.location.href = "/email-confirmation-required";
			})
			.catch(() => {
				message.error("Confirmation email resent error");
			});
	};

	return (
		<Card style={{ width: "350px" }}>
			<Form layout="vertical" onFinish={onFinish}>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{ required: true, message: "Email must not be empty" },
						{
							pattern: /^[^а-яА-Я]*$/,
							message: "Email must not contain Cyrillic characters",
						},
						{ min: 5, message: "Email must be at least 5 characters long" },
						{
							max: 254,
							message: "Email must be less than 254 characters long",
						},
						{ type: "email", message: "Invalid email address format" },
					]}
				>
					<Input prefix={<MailOutlined />} placeholder="Enter your Email" />
				</Form.Item>
				<Button htmlType="submit" style={{ width: "100%" }}>
					Resend email confirmation
				</Button>
			</Form>
		</Card>
	);
};

export default ResendEmailConfirmationCard;
