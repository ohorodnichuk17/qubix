import { APP_ENV } from "../env";
import { avatar } from "../utils/images";
import { useAppSelector } from "./redux";

const useAvatar = () => {
	const { user } = useAppSelector((state) => state.account);
	
    const avatarImg =
		user?.avatar && user.avatar !== "/images/avatars/"
			? `${APP_ENV.BASE_URL}${user.avatar}`
			: avatar;

    return avatarImg;
};

export default useAvatar;