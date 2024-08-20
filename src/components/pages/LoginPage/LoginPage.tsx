import type React from "react";
import { Form, Input, Button, Flex, Card, Divider, message } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./LoginPage.css";
import { useAppDispatch } from "../../../hooks/redux";
import { login } from "../../../store/account/account.actions";
import { unwrapResult } from "@reduxjs/toolkit";
import type { ILogin } from "../../../interfaces/account";
import { useState } from "react";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState<boolean>(false);

	const [searchParams] = useSearchParams();
	const redirectAddress = searchParams.get("redirect-to");

	const onFinish = async (values: ILogin) => {
		try {
			setLoading(true);

			const response = await dispatch(login(values));
			unwrapResult(response);

			if (redirectAddress) {
				navigate(redirectAddress);
				return;
			}
			navigate("/");
		} catch (error) {
			const typedError = error as ErrorResponse;

			if (typedError.errors && typedError.errors.length > 0) {
				if (typedError.errors[0].code === "Email is not confirmed") {
					navigate("/email-confirmation-required")
				} else {
					message.error("Incorrect email or password!");
				}
			}
		}

		setLoading(false);
	};

	return (
		<Flex
			justify="center"
			align="center"
			wrap="wrap"
			gap={30}
			style={{ minHeight: "80vh" }}
		>
			<div style={{ marginRight: "50px" }}>
				<h1
					style={{ color: "#FF7F50", fontFamily: "Lilita One", fontSize: 48 }}
				>
					Qubix
				</h1>
				<p
					style={{ fontFamily: "Lilita One", fontWeight: "bold", fontSize: 24 }}
				>
					Where connections are made,
					<br />
					and communities are built.
				</p>
			</div>
			<Card style={{ width: "400px" }}>
				<Form onFinish={onFinish} layout="vertical" requiredMark={false}>
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
						<Input prefix={<MailOutlined />} placeholder="Email address" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						style={{ width: "100%" }}
						rules={[
							{ required: true, message: "Password must not be empty" },
							{
								min: 8,
								message: "Password must be at least 8 characters long",
							},
							{
								max: 24,
								message: "Password must be less than 24 characters long",
							},
							{
								pattern: /[A-Z]/,
								message: "Password must contain at least one uppercase letter",
							},
							{
								pattern: /[a-z]/,
								message: "Password must contain at least one lowercase letter",
							},
							{
								pattern: /\d/,
								message: "Password must contain at least one digit",
							},
							{
								pattern: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
								message: "Password must contain at least one special character",
							},
							{
								pattern: /^[^£#“”]*$/,
								message:
									"Password must not contain the following characters: £ # “”",
							},
							{
								pattern: /^[^а-яА-Я]*$/,
								message: "First name must not contain Cyrillic characters",
							},
						]}
					>
						<Input.Password prefix={<LockOutlined />} />
					</Form.Item>

					<Form.Item>
						<Button
							loading={loading}
							htmlType="submit"
							style={{ color: "white", width: "100%" }}
						>
							Sign In
						</Button>
					</Form.Item>

					<Divider />

					<Flex vertical align="center" gap="middle">
						<Link to="/forgot-password" style={{ color: "#FF6347" }}>
							Forgot password?
						</Link>
						<Link to="/register" style={{ color: "#FF6347" }}>
							Create account
						</Link>
					</Flex>
				</Form>
			</Card>
		</Flex>
	);
};

export default LoginPage;
