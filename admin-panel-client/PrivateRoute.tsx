import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

type PrivateRouteProps = {
   children: ReactNode;
   roles?: string[];
};

const PrivateRoute = ({ children, roles = [] }: PrivateRouteProps) => {
   const { isLogin, user } = useAppSelector((state) => state.account);

   const location = useLocation();
   const redirectAddress = `/login?redirect-to=${location.pathname}`;

   if (!isLogin) {
      return <Navigate to={redirectAddress} />;
   }

   if (!user) {
      return <Navigate to={redirectAddress} />;
   }

   if (roles.length > 0 && !roles.includes(user.role)) {
      return <Navigate to="/" />;
   }

   return children;
};

export default PrivateRoute;
