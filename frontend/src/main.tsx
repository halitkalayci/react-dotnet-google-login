import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
	<GoogleOAuthProvider clientId="client_id">
		<App />
	</GoogleOAuthProvider>,
);
