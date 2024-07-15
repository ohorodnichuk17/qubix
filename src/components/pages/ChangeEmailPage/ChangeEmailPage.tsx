import { MailOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, message } from "antd";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import type { IChangeEmail } from "../../../interfaces/account";
import { apiClient } from "../../../utils/api/apiClient";
import { changeEmail } from "../../../utils/images";

const ChangeEmailPage: React.FC = () => {
	const account = useAppSelector((state) => state.account);

	const navigate = useNavigate();

	const onFinish = (values: IChangeEmail) => {
		if (
			account?.token === null ||
			account?.user?.id === null ||
			account?.user?.id === undefined
		) {
			message.error("Change email error. Try later");
			return;
		}

		values.token = account?.token;
		values.userId = account?.user?.id;
		
      apiClient
			.post("/api/authentication/change-email", values)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					message.success("Success").then(() => navigate("/"));
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Flex
			justify="center"
			align="center"
			wrap="wrap"
			className="auth-pages-flex"
		>
			<div>
				<img
					src={changeEmail}
					alt="forgotPasswordImage"
					className="auth-pages-img"
				/>
			</div>
			<Card style={{ width: "400px" }}>
				<h3 style={{ fontSize: 32 }}>Email change</h3>
				<p style={{ fontSize: 18 }}>
					Change the email address for your Quilt account
				</p>
				<Form onFinish={onFinish} layout="vertical" requiredMark={false}>
					<Form.Item label="Email" name="email">
						<Input prefix={<MailOutlined />} placeholder="Email address" />
					</Form.Item>

					<Form.Item>
						<Button htmlType="submit" style={{ color: "white", width: "100%" }}>
							Change my email address
						</Button>
					</Form.Item>

					<Form.Item>
						<Flex justify="center">
							<Link to="/" style={{ color: "#FF6347" }}>
								Back to Main page
							</Link>
						</Flex>
					</Form.Item>
				</Form>
			</Card>
		</Flex>
	);
};

export default ChangeEmailPage;
