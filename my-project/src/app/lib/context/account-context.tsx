"use client";
import { useRouter as useNavigation, usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axiosInstance from "../api";
import { GetTokenCookies, SetTokenCookies } from "./cookies";
import { ResponseObject, StatusResponse } from "../../../../../backend/types/response.type";
import { AxiosError } from "axios";
import Toast from "../util/toast";
import { useTheme } from "next-themes";
import { Theme } from "react-toastify";
import { uiPublicPaths } from "../auth/publicPaths";
import { ProfileObject } from "@/app/types/object.types";

interface AccountContext {
	profile?: ProfileObject;
	token?: string;
	authenticated: boolean;
	sessionValid: boolean;
	handleLogout: () => void;
	// eslint-disable-next-line no-unused-vars
	handleLogin: (loginParams: loginParams) => void;
	checkSession: () => void;
	// eslint-disable-next-line no-unused-vars
}

const AccountContext = createContext<AccountContext | null>(null);

interface AccountProviderProps {
	children?: React.ReactNode;
}

export interface loginParams {
	authcode: string;
	userName: string;
	password: string;
	deviceid: string;
	devicetype: number;
	devicename: string;
}

export interface SocialLoginParams {
	email: string;
	displayName: string;
	accessToken: string;
	idToken: string;
	devicetype: number;
	deviceid: string;
	devicename: string;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
	const [profile, setProfile] = useState<ProfileObject>();
	const [token, setToken] = useState<string>();
	const [sessionValid, setSessionValid] = useState<boolean>(false);
	const { theme } = useTheme();
	const toastInstance = new Toast(theme as Theme);

	const navigation = useNavigation();
	const pathname = usePathname();

	const authenticated = uiPublicPaths.includes(pathname) ? true : sessionValid;

	const handleLogout = () => {
		axiosInstance(GetTokenCookies())
			.post("/api/user/signout")
			.then((response) => {
				console.log(response);
				if (response.status == 200) {
					const responseObject: ResponseObject =
						response?.data as ResponseObject;
					if (responseObject.status == StatusResponse.success) {
						toastInstance.success(responseObject.message);
					} else {
						toastInstance.error(responseObject.message);
					}
					setSessionValid(false);
					SetTokenCookies("");
					navigation.push("/login");
				}
			})
			.catch((error) => {
				if (error instanceof AxiosError) {
					// console.log("Error in Logout :", error.response);
					const responseObject: ResponseObject = error.response
						?.data as ResponseObject;
					console.error("Error in Logout :", responseObject.message);

					setSessionValid(false);
					SetTokenCookies("");
					navigation.push("/login");
				}
			});
	};

	const checkSession = useCallback(() => {
		// console.log("Check Session is Being Validated:", pathname);

		const token = GetTokenCookies();
		if (token.length === 0) {
			// console.log("Token is Empty", token);
			if (uiPublicPaths.includes(pathname)) {
				return;
			}
			navigation.push("/login");
			return;
		}

		axiosInstance(token)
			.get("/api/user/profile")
			.then((response) => {
				console.log("Check Session", response.data);
				if (response.status == 200) {
					const responseObject: ResponseObject =
						response.data as ResponseObject;
					if (responseObject.status == StatusResponse.success) {
						setSessionValid(true);
						setProfile(responseObject.data.profile)
						if (uiPublicPaths.includes(pathname)) {
							navigation.push("/");
						}
						// setProfile(responseObject.data.profile);
						// router.push("/");
					} else {
						handleLogout();
					}
				}
			}) 
			.catch((error) => {
				if (error instanceof AxiosError) {
					console.log("Error in Check Session :", error.response);
					if (!uiPublicPaths.includes(pathname as string)) {
						handleLogout();
					}
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigation, pathname]);

	const handleLogin = (loginParams: loginParams) => {
		axiosInstance(token ?? "")
			.post("/login", loginParams)
			.then((response) => {
				if (response.status === 200) {
					const responseObject: ResponseObject =
						response.data as ResponseObject;
					console.log("Login:", responseObject);
					if (responseObject.status == StatusResponse.success) {
						const token = responseObject.data.token;
						setToken(token);
						setSessionValid(true);
						SetTokenCookies(token);
						setProfile(responseObject.data.profile);	
						toastInstance.success(responseObject.message);
						navigation.push("/");
					} else {
						toastInstance.error(responseObject.message);
					}
				} else {
					console.log("API call failed");
				}
			})
			.catch((error) => {
				if (error instanceof AxiosError) {
					console.error("Err in Login:", error.message, error.response?.data);
					const data: ResponseObject = error.response?.data;
					if (data.status == StatusResponse.success) {
						toastInstance.success(data.message);
					} else {
						toastInstance.error(data.message);
					}
				}
			});
	};

	return (
		<AccountContext.Provider
			value={{
				profile,
				token,
				authenticated,
				sessionValid,
				handleLogout,
				checkSession,
				handleLogin,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};

export const useAccount = () => {
	const context = useContext(AccountContext);

	if (context === null) {
		throw new Error("useAccount must be used within a AccountProvider");
	}

	return context;
};
