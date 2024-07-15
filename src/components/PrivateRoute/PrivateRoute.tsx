import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

type PrivateRouteProps = {
	children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { isLogin } = useAppSelector((state) => state.account);

	return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
