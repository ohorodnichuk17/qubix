import { useEffect, useState } from "react";
import { APP_ENV } from "../env";
import { avatar as defaultAvatar } from "../utils/images";
import { useAppSelector } from "./redux";

const useAvatar = () => {
   const { user } = useAppSelector((state) => state.account);
   const [avatarImg, setAvatarImg] = useState(defaultAvatar);

   useEffect(() => {
      const fetchAvatar = async () => {
         if (user?.avatar && user.avatar !== "/images/avatars/") {
            try {
               const response = await fetch(`${APP_ENV.BASE_URL}${user.avatar}`);
               if (response.ok) {
                  setAvatarImg(`${APP_ENV.BASE_URL}${user.avatar}`);
               } else {
                  setAvatarImg(defaultAvatar);
               }
            } catch (error) {
               setAvatarImg(defaultAvatar);
            }
         }
      };

      fetchAvatar();
   }, [user]);

   return avatarImg;
};

export default useAvatar;
