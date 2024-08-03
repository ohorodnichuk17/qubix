import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

type PrivateRouteProps = {
	children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { isLogin } = useAppSelector((state) => state.account);

	const location = useLocation();
	const redirectAddress = `/login?redirect-to=${location.pathname}`;

	return isLogin ? children : <Navigate to={redirectAddress} />;
};

export default PrivateRoute;
