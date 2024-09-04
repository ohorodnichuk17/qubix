import { MailOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, Spin, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { IForgotPassword } from "../../../interfaces/account";
import { apiClient } from "../../../utils/api/apiClient";
import { forgotPasswordImage } from "../../../utils/images";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

const ForgotPasswordPage = () => {
	const [forgotPasswordSuccess, setForgotPasswordSuccess] =
		useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const onFinish = (values: IForgotPassword) => {
		setLoading(true);
		apiClient
			.get(`/api/authentication/forgot-password?email=${values.email}`)
			.then((res) => {
				if (res.status === 200) {
					message.success("Success");
					setForgotPasswordSuccess(true);
				}
			})
			.catch(() => {
				message.error("Forgot password email sending error. Try later");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (forgotPasswordSuccess) {
		return <ForgotPasswordSuccess />;
	}

	return (
		<Flex
			justify="center"
			align="center"
			wrap="wrap"
			className="auth-pages-flex"
		>
			<div>
				<img
					src={forgotPasswordImage}
					alt="forgotPasswordImage"
					className="auth-pages-img"
				/>
			</div>
			<Card style={{ width: "400px" }}>
				<h3 style={{ fontSize: 32 }}>Forgot password?</h3>
				<p style={{ fontSize: 18 }}>
					Enter your email and we’ll send you a link to reset your password.
				</p>
				<Form onFinish={onFinish} layout="vertical" requiredMark={false}>
					<Form.Item label="Email" name="email">
						<Input prefix={<MailOutlined />} placeholder="Email address" />
					</Form.Item>

					<Form.Item>
						<Button
							htmlType="submit"
							style={{ color: "white", width: "100%" }}
							disabled={loading}
						>
							{loading ? <Spin size="small" /> : "Submit"}
						</Button>
					</Form.Item>

					<Form.Item>
						<Flex justify="center">
							<Link to="/login" style={{ color: "#FF6347" }}>
								Back to Login
							</Link>
						</Flex>
					</Form.Item>
				</Form>
			</Card>
		</Flex>
	);
};

export default ForgotPasswordPage;
