import { Flex, Avatar, Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { apiClient } from "../../../../utils/api/apiClient";
import type { IComment, ICreateCommentReply } from "../types";
import { useAppSelector } from "../../../../hooks/redux";
import useAvatar from "../../../../hooks/useAvatar";

type AddCommentReplyFormProps = {
	comment: IComment;
	setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
	setAnswerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCommentReplyForm = ({
	comment,
	setComments,
	setAnswerVisibility,
}: AddCommentReplyFormProps) => {
	const { user } = useAppSelector((state) => state.account);
	const [form] = Form.useForm();
	const avatarImg = useAvatar();

	const postComment = (values: ICreateCommentReply) => {
		apiClient
			.post("api/comment/add-reply", values, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((res) => {
				form.resetFields();

				const updatedComment = {
					...comment,
					childComments: [...comment.childComments, res.data],
				};
				setComments((prevComments) =>
					prevComments.map((c) => (c.id === comment.id ? updatedComment : c)),
				);
				setAnswerVisibility(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
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
	);
};

export default AddCommentReplyForm;