import { Flex, Avatar, Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import { avatar } from "../../../../utils/images";
import type { IComment, ICreateCommentReply } from "../types";
import ChildCommentItem from "./ChildCommentItem";
import { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import useAvatar from "../../../../hooks/useAvatar";
import { apiClient } from "../../../../utils/api/apiClient";
import { useAppSelector } from "../../../../hooks/redux";

type CommentItemProps = {
	comment: IComment;
};

const CommentItem = ({ comment }: CommentItemProps) => {
	const { user } = useAppSelector((state) => state.account);
	const [answerVisibility, setAnswerVisibility] = useState<boolean>(false);
	const [form] = Form.useForm();
	const avatarImg = useAvatar();

	if (comment.parentCommentId !== null) {
		return null;
	}

	const postComment = (values: ICreateCommentReply) => {
		apiClient
			.post("api/comment/add-reply", values, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then(() => {
				form.resetFields();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			<Flex gap="small">
				<NavLink
					to={`profile?userId=${comment.userId}`}
					style={{ height: "fit-content" }}
				>
					<Avatar
						size={45}
						src={
							comment.userEntity.avatar === null
								? avatar
								: `${APP_ENV.BASE_URL}/images/avatars/${comment.userEntity.avatar}`
						}
					/>
				</NavLink>
				<Flex vertical style={{ width: "100%" }}>
					<Flex
						vertical
						style={{
							backgroundColor: "#f0f2f5",
							borderRadius: 8,
							padding: 5,
							width: "100%",
						}}
					>
						<span
							style={{ fontWeight: 500 }}
						>{`${comment.userEntity.firstName} ${comment.userEntity.lastName}`}</span>
						<span> {comment.message}</span>
					</Flex>
					{!answerVisibility && (
						<Button
							type="text"
							style={{
								color: "blue",
								padding: "0 2.5px",
								height: "fit-content",
								width: "fit-content",
							}}
							onClick={() => setAnswerVisibility(true)}
						>
							Answer
						</Button>
					)}
				</Flex>
			</Flex>
			{answerVisibility && (
				<Flex style={{ width: "100%" }} gap={5}>
					<Avatar
						size={45}
						src={avatarImg}
						style={{ minHeight: 45, minWidth: 45 }}
					/>
					<Form form={form} style={{ width: "100%" }} onFinish={postComment}>
						<FormItem hidden name="parentId" initialValue={comment.id} />
						<FormItem name="message" rules={[{ required: true }]}>
							<Flex vertical align="end" gap={3}>
								<Input.TextArea
									style={{ width: "100%" }}
									placeholder={`Comment as ${user?.firstName} ${user?.lastName}`}
								/>
								<Button htmlType="submit" style={{ width: "fit-content" }}>
									Comment
								</Button>
							</Flex>
						</FormItem>
					</Form>
				</Flex>
			)}
			{comment.childComments.map((comment) => (
				<ChildCommentItem key={comment.id} comment={comment} />
			))}
		</>
	);
};

export default CommentItem;