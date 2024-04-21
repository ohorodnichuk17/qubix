import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { getLocalStorage } from "./utils/storage/localStorageUtils.ts";
import { isTokenActive } from "./utils/storage/isTokenActive.ts";
import { autoLogin } from "./store/account/account.slice.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Router>
      <Provider store={store}>
         <App />
      </Provider>
   </Router>
);

