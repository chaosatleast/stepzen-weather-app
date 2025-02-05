export function getGradient(
	utc_offset_seconds: number,
	dailySunrise: string,
	dailySunset: string,
	timezone: string,
) {
	console.log(`timezone: ${timezone}`);
	// Correctly calculate the current timestamp with the timezone
	const serverTimestamp = new Date(Date.now()).getTime(); // UTC timestamp (milliseconds)
	const current = serverTimestamp + utc_offset_seconds * 1000;
	// Convert sunrise and sunset to correct timestamps using UTC offset
	const sunrise = new Date(dailySunrise).getTime() + utc_offset_seconds * 1000;
	const sunset = new Date(dailySunset).getTime() + utc_offset_seconds * 1000;

	const factor = 30; // 30-minute buffer before/after sunrise and sunset

	// Calculate start and end periods for sunrise and sunset
	const sunriseStart = sunrise - factor * 60 * 1000;
	const sunriseEnd = sunrise + factor * 60 * 1000;
	const sunsetStart = sunset - factor * 60 * 1000;
	const sunsetEnd = sunset + factor * 60 * 1000;

	console.log(`Current: ${new Date(current).toISOString()}`);
	console.log(`Sunrise Start: ${new Date(sunriseStart).toISOString()}`);
	console.log(`Sunrise End: ${new Date(sunriseEnd).toISOString()}`);
	console.log(`Sunset Start: ${new Date(sunsetStart).toISOString()}`);
	console.log(`Sunset End: ${new Date(sunsetEnd).toISOString()}`);

	// Determine the current period based on the time
	if (current > sunriseStart && current < sunriseEnd) {
		console.log("gradient  sunrise");
		return `var(--sunrise-gradient)`;
	} else if (current < sunsetStart) {
		console.log("gradient  day");
		return `var(--daytime-gradient)`;
	} else if (current > sunsetStart && current < sunriseEnd) {
		console.log("gradient  sunset");
		return `var(--sunset-gradient)`;
	} else {
		console.log("gradient night");
		return `var(--nighttime-gradient)`;
	}
}
