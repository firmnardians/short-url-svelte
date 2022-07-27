export function generateRandomString() {
	const r = (Math.random() + 1).toString(36).substring(7);
	return r;
}

export const urlValidation = /^(ftp|http|https):\/\/[^ "]+$/;
