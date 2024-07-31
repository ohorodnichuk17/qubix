import { Flex, Avatar, Form, Input, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import useAvatar from "../../../../hooks/useAvatar";
import type { ICreateComment, IPost } from "../types";
import { apiClient } from "../../../../utils/api/apiClient";

type AddCommentFormProps = {
	post: IPost;
};

const AddCommentForm = ({ post }: AddCommentFormProps) => {
	const [form] = Form.useForm();
	const avatarImg = useAvatar();

	const postComment = (values: ICreateComment) => {
		apiClient
			.post("api/comment/add", values, {
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
		<Flex style={{ width: "100%" }} gap={5}>
			<Avatar
				size={45}
				src={avatarImg}
				style={{ minHeight: 45, minWidth: 45 }}
			/>
			<Form form={form} style={{ width: "100%" }} onFinish={postComment}>
				<FormItem hidden name="postId" initialValue={post.id} />
				<FormItem name="message" rules={[{ required: true }]}>
					<Flex vertical align="end" gap={3}>
						<Input.TextArea
							style={{ width: "100%" }}
							placeholder={`Comment as ${post.user.firstName} ${post.user.lastName}`}
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

export default AddCommentForm;
