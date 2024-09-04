import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./store";
import "./index.css";
import { autoLogin } from "./store/account/account.slice.ts";
import { isTokenActive } from "./utils/storage/isTokenActive.ts";
import { getLocalStorage } from "./utils/storage/localStorageUtils.ts";

const token = getLocalStorage("authToken");
if (typeof token === "string") {
	if (isTokenActive(token)) {
		store.dispatch(autoLogin(token));
	}
}
ReactDOM.createRoot(document.getElementById("root")!).render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
);
