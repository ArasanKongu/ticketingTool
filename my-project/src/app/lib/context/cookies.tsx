import { Cookies } from "typescript-cookie";
import { v4 as uuidv4 } from "uuid";

export const GetUnqiueDeviceId = (): string => {
	const getCookies = Cookies.get("deviceId");

	if (getCookies == null || getCookies == undefined) {
		const deviceID = uuidv4();

		Cookies.set("deviceId", deviceID);
		return deviceID;
	} else {
		return getCookies as string;
	}
};

export const SetTokenCookies = (token: string) => {
	if (Cookies.get("token") != null) {
		Cookies.remove("token");
	}
	Cookies.set("token", token);
};

export const GetTokenCookies = (): string => {
	const token: string = Cookies.get("token") as string;
	return token ?? "";
};
