import {
	friendsExceptImg,
	friendsImg,
	planetImg,
	userImg,
} from "../../../../../utils/images";
import type { PostVisibilityOption } from "../../types";

export const VISIBILITY_OPTIONS: PostVisibilityOption[] = [
	{ visibility: "public", icon: planetImg, title: "Available to everyone" },
	{ visibility: "private", icon: userImg, title: "Just me" },
	{ visibility: "friends only", icon: friendsImg, title: "Friends" },
	{
		visibility: "friends except",
		icon: friendsExceptImg,
		title: "Friends, except",
	},
];
