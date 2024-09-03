import { useEffect, useState } from "react";
import {
   Card,
   Flex,
   Avatar,
   Divider,
   Carousel,
   Tag,
   Badge,
   message,
   Tooltip,
   Popconfirm,
} from "antd";
import {
   CommentOutlined,
   DeleteTwoTone,
   LikeFilled,
   SmileTwoTone,
} from "@ant-design/icons";
import { APP_ENV } from "../../../../env";
import { avatar, likeImg, locationImg } from "../../../../utils/images";
import { getRandomTagColor } from "../../create/components/Tags/TagsList";
import type { IComment, ILike, IPost } from "../types";
import { ACTION_OPTIONS, FEELING_OPTIONS } from "../../../feelings/constants";
import type { IAction, ISubAction, IFeeling } from "../../../feelings/types";
import { NavLink } from "react-router-dom";
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";
import { apiClient } from "../../../../utils/api/apiClient";
import Arrow from "../../../featured/Arrow/Arrow";
import { useAppSelector } from "../../../../hooks/redux";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

type PostItemCardProps = {
   post: IPost;
   setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
};

const PostItemCard = ({ post, setPosts }: PostItemCardProps) => {
   const { user } = useAppSelector((state) => state.account);
   const [commentsVisibility, setCommentsVisibility] = useState<boolean>(false);
   const [comments, setComments] = useState<IComment[]>([]);
   const [isLiked, setIsLiked] = useState<boolean>(false);
   const [showPicker, setShowPicker] = useState<boolean>(false);

   useEffect(() => {
      apiClient.get(`api/comment/${post.id}`).then((res) => {
         setComments(res.data);
      });

      for (const like of post.likes) {
         if (like.userId === user?.id) {
            setIsLiked(true);
            return;
         }
      }
   }, [post.id, post.likes, user]);

   if (!post || !post.user) {
      return null;
   }

   const getPublicationDate = (date: string) => new Date(date).toDateString();

   const getActionImage = (action: IAction, subAction: ISubAction) =>
      subAction
         ? ACTION_OPTIONS.find((a) => a.name === action.name)?.subActions?.find(
            (s) => s.name === subAction.name,
         )?.emoji
         : ACTION_OPTIONS.find((a) => a.name === action.name)?.emoji;

   const getFeelingImage = (feeling: IFeeling) =>
      FEELING_OPTIONS.find((f) => f.name === feeling.name)?.emoji;

   const likePost = () => {
      apiClient.post<ILike>("api/like", { postId: post.id }).then((res) => {
         setPosts((prevPosts) =>
            prevPosts.map((prevPost) =>
               prevPost.id === post.id
                  ? { ...post, likes: [...prevPost.likes, res.data] }
                  : prevPost,
            ),
         );
      });
   };

   const onEmojiClick = (event: EmojiClickData) => {
      const data = {
         postId: post.id,
         emoji: event.emoji,
      };
      apiClient.post("/api/reaction", data);
      setShowPicker(false);
   };

   const unlikePost = () => {
      try {
         apiClient.delete("/api/like", { data: { postId: post.id } });
         setIsLiked(false);

         setPosts((prevPosts) =>
            prevPosts.map((prevPost) =>
               prevPost.id === post.id
                  ? {
                     ...prevPost,
                     likes: prevPost.likes.filter(
                        (like) => like.userId !== user?.id,
                     ),
                  }
                  : prevPost,
            ),
         );
      } catch (error) {
         message.error("Unlike post error!");
      }
   };

   const deletePost = () => {
      try {
         apiClient.delete("api/post", { data: { id: post.id } });
         message.success("Post successfully deleted!");
         setPosts((prevPosts) =>
            prevPosts.filter((postFromList) => postFromList.id !== post.id),
         );
      } catch (error) {
         message.error("Post deletion error!");
      }
   };

   return (
      <Card
         key={post.id}
         style={{ maxWidth: "600px", width: "100%", margin: "auto" }}
      >
         <Flex vertical gap="small">
            <Flex justify="space-between" align="center" gap="small">
               <Flex align="center" gap="small">
                  <NavLink to={`/profile?userId=${post.user.id}`}>
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
                     <Flex align="center" gap="small">
                        <NavLink
                           to={`/profile?userId=${post.user.id}`}
                           style={{ color: "black" }}
                        >
                           <span style={{ fontWeight: 600, fontSize: 20 }}>
                              {`${post.user.firstName} ${post.user.lastName}`}
                           </span>
                        </NavLink>
                        {post.user.isOnline ? (
                           <Badge color="green" count={"online"} />
                        ) : (
                           <Badge color="gray" count={"offline"} />
                        )}
                     </Flex>
                     <span>{getPublicationDate(post.createdAt)}</span>
                  </Flex>
               </Flex>

               {post.userId === user?.id && (
                  <Popconfirm
                     title="Delete post ?"
                     onConfirm={deletePost}
                     okText="Yes"
                     cancelText="No"
                  >
                     <DeleteTwoTone style={{ fontSize: 18 }} />
                  </Popconfirm>
               )}
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
               nextArrow={<Arrow direction="right" />}
               prevArrow={<Arrow direction="left" />}
            >
               {post.images.map((image) => (
                  <img
                     key={image.id}
                     src={`${APP_ENV.BASE_URL}/images/posts/${image.imagePath}`}
                     className="post-preview-img"
                     alt="Post images"
                     style={{ maxWidth: "100%", height: "auto" }}
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
                        style={{
                           margin: 0,
                           width: "fit-content",
                           fontSize: "14px",
                        }}
                     >
                        {`#${tag}`}
                     </Tag>
                  ))}
               </Flex>
            )}

            <Flex gap="small">
               {isLiked ? (
                  <Tooltip title="Unlike post">
                     <Flex className="post-actions-flex" onClick={unlikePost}>
                        <LikeFilled style={{ color: "red" }} />
                        <span>{post.likes.length}</span>
                     </Flex>
                  </Tooltip>
               ) : (
                  <Flex className="post-actions-flex" onClick={likePost}>
                     <img
                        src={likeImg}
                        alt="Like"
                        width={30}
                     />
                     <span>{post.likes.length}</span>
                  </Flex>
               )}
               <Flex
                  className="post-actions-flex"
                  onClick={() => setShowPicker(!showPicker)}
               >
                  <SmileTwoTone style={{ fontSize: 20 }} />
                  <span>Reactions</span>
               </Flex>

               <Tooltip
                  title={commentsVisibility ? "Hide comments" : "Show comments"}
               >
                  <Flex
                     gap="small"
                     className="post-actions-flex"
                     onClick={() => {
                        setCommentsVisibility(!commentsVisibility);
                     }}
                  >
                     <CommentOutlined />
                     <span>{comments.length > 0 ? comments.length : ""}</span>
                  </Flex>
               </Tooltip>
            </Flex>
            <EmojiPicker open={showPicker} onEmojiClick={onEmojiClick} />

            <AddCommentForm post={post} setComments={setComments} />

            {commentsVisibility && (
               <CommentsList comments={comments} setComments={setComments} />
            )}
         </Flex>
      </Card>
   );
};

export default PostItemCard;
