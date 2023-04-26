const getHostPath = () => {
  const hostPath =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;
  return hostPath;
};

export default getHostPath;
