import crypto from "crypto";

export const createHmacApp = (key: string, data: string) => {
	return crypto.createHmac("sha256", key).update(data).digest("hex"); // Returns the HMAC in hexadecimal format
};
