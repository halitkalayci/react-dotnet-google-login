import {GoogleLogin, GoogleLoginProps} from "@react-oauth/google";
import {useState} from "react";

const GoogleLoginButton = () => {
	const [payload, setPayload] = useState<any>(null);
	const handleLoginSuccess = (response: any) => {
		const idToken = response.credential;

		fetch("https://localhost:7287/api/Auth/google-login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({idToken}),
		})
			.then(response => response.json())
			.then(data => {
				// API'den gelen JWT token'ı saklayın,
				setPayload(data.payload);
			})
			.catch(error => console.error("Error:", error));
	};

	const handleLoginFailure = () => {};

	return (
		<>
			<GoogleLogin
				text="signin_with"
				auto_select={false}
				theme="filled_blue"
				itp_support={false}
				ux_mode="popup" // popup, redirect=>yeni sayfada açar
				onSuccess={handleLoginSuccess}
				onError={handleLoginFailure}
			/>
			{payload && (
				<>
					<h3>Çekilen Bilgiler:</h3>
					{Object.keys(payload).map(key => {
						if (payload[key])
							return (
								<p key={key}>
									{key}: {payload[key]}
								</p>
							);
					})}
				</>
			)}
		</>
	);
};

export default GoogleLoginButton;
