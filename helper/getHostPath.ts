const getHostPath = () => {
	const hostPath =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
	return hostPath;
};

export default getHostPath;
