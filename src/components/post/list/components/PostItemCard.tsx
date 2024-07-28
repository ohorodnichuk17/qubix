import {
	CommentOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";
import { Card, Flex, Avatar, Divider, Carousel, Tag } from "antd";
import { APP_ENV } from "../../../../env";
import { avatar, locationImg } from "../../../../utils/images";
import { getRandomTagColor } from "../../create/components/Tags/TagsList";
import type { IPost } from "../types";
import { ACTION_OPTIONS, FEELING_OPTIONS } from "../../../feelings/constants";
import type { IAction, ISubAction, IFeeling } from "../../../feelings/types";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CommentsList from "./CommentsList";

type PostItemCardProps = {
	post: IPost;
};

const PostItemCard = ({ post }: PostItemCardProps) => {
	const [commentsVisibility, setCommentsVisibility] = useState<boolean>(false);

	const getPublicationDate = (date: string) => new Date(date).toDateString();

	const getActionImage = (action: IAction, subAction: ISubAction) =>
		subAction
			? ACTION_OPTIONS.find((a) => a.name === action.name)?.subActions?.find(
					(s) => s.name === subAction.name,
				)?.emoji
			: ACTION_OPTIONS.find((a) => a.name === action.name)?.emoji;

	const getFeelingImage = (feeling: IFeeling) =>
		FEELING_OPTIONS.find((f) => f.name === feeling.name)?.emoji;

	return (
		<Card key={post.id} style={{ width: "100%" }}>
			<Flex vertical gap="small">
				<Flex align="center" gap="small">
					<NavLink to={`profile?userId=${post.user.id}`}>
						<Avatar
							size={60}
							src={
								post.user.avatar === null
									? avatar
									: `${APP_ENV.BASE_URL}/images/avatars/${post.user.avatar}`
							}
						/>
					</NavLink>
					<Flex vertical>
						<NavLink
							to={`profile?userId=${post.user.id}`}
							style={{ color: "black" }}
						>
							<span style={{ fontWeight: 600, fontSize: 20 }}>
								{`${post.user.firstName} ${post.user.lastName}`}
							</span>
						</NavLink>
						<span>{getPublicationDate(post.createdAt)}</span>
					</Flex>
				</Flex>

				<Divider style={{ margin: 0 }} />

				{post.action && (
					<Flex align="center" gap="small">
						<img
							src={getActionImage(post.action, post.subAction)}
							alt="Action icon"
							style={{ height: 35, width: 35 }}
						/>
						<span>{post.action.name}</span>

						{post.subAction && <span>{post.subAction.name}</span>}
					</Flex>
				)}

				{post.feeling && (
					<Flex align="center" gap="small">
						<img
							src={getFeelingImage(post.feeling)}
							alt="Feeling icon"
							style={{ height: 35, width: 35 }}
						/>
						<span>{post.feeling.name}</span>
					</Flex>
				)}

				<Carousel
					arrows
					draggable
					infinite
					prevArrow={<LeftOutlined />}
					nextArrow={<RightOutlined />}
				>
					{post.images.map((image) => (
						<img
							key={image.id}
							src={`${APP_ENV.BASE_URL}/images/posts/${image.imagePath}`}
							className="post-preview-img"
							alt="Post images"
						/>
					))}
				</Carousel>

				{post.location && (
					<Flex align="center" gap="small">
						<img src={locationImg} height={35} alt="Post images" />
						<span>{post.location}</span>
					</Flex>
				)}

				{post.content !== "undefined" && (
					<p style={{ margin: 0 }}>{post.content}</p>
				)}

				{post.tags && (
					<Flex wrap="wrap" gap="small">
						{post.tags.map((tag) => (
							<Tag
								key={tag}
								color={getRandomTagColor()}
								style={{ margin: 0, width: "fit-content" }}
							>
								{`#${tag}`}
							</Tag>
						))}
					</Flex>
				)}

				<CommentOutlined
					style={{ cursor: "pointer" }}
					onClick={() => {
						setCommentsVisibility(!commentsVisibility);
					}}
				/>

				{commentsVisibility && <CommentsList postId={post.id} />}
			</Flex>
		</Card>
	);
};

export default PostItemCard;