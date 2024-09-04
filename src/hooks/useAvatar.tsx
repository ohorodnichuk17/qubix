import { useEffect, useState } from "react";
import { APP_ENV } from "../env";
import { avatarImg as defaultAvatar } from "../utils/images";
import { useAppSelector } from "./redux";

const useAvatar = () => {
	const { user } = useAppSelector((state) => state.account);
	const [avatarImg, setAvatarImg] = useState(defaultAvatar);

	useEffect(() => {
		setAvatarImg(
			user?.avatar
				? `${APP_ENV.BASE_URL}/images/avatars/${user.avatar}`
				: defaultAvatar,
		);
	}, [user?.avatar]);

	return avatarImg;
};

export default useAvatar;
