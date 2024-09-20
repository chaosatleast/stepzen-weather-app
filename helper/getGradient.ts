export function getGradient(
	utc_offset_seconds: number,
	dailySunrise: string,
	dailySunset: string
) {
	let current = new Date().getTime() + utc_offset_seconds * 1000;
	// Convert sunrise and sunset times with UTC offset applied
	let sunrise = new Date(dailySunrise).getTime() + utc_offset_seconds * 1000;
	let sunset = new Date(dailySunset).getTime() + utc_offset_seconds * 1000;

	const factor = 30; // 30-minute buffer before/after sunrise and sunset

	// Calculate start and end periods for sunrise and sunset
	const sunriseStart = sunrise - factor * 60 * 1000;
	const sunriseEnd = sunrise + factor * 60 * 1000;
	const sunsetStart = sunset - factor * 60 * 1000;
	const sunsetEnd = sunset + factor * 60 * 1000;

	console.log(`current: `, current);
	console.log(`sunriseStart: `, sunriseStart);
	console.log(`sunriseEnd: `, sunriseEnd);
	console.log(`sunsetStart: `, sunsetStart);
	console.log(`sunsetEnd: `, sunsetEnd);
	console.log(`sunrise: `, sunrise);
	console.log(`sunset: `, sunset);
	console.log(`dailySunrise: `, dailySunrise);
	console.log(`dailySunset: `, dailySunset);
	console.log(`current:`, new Date().getTime());

	console.log(current > sunriseEnd);
	console.log(current < sunsetStart);

	// Determine the current period based on the time
	if (current >= sunriseStart && current <= sunriseEnd) {
		console.log("sunrise");
		return `var(--sunrise-gradient)`;
	} else if (current > sunriseEnd && current < sunsetStart) {
		console.log("day");
		return `var(--daytime-gradient)`;
	} else if (current >= sunsetStart && current <= sunsetEnd) {
		console.log("sunset");
		return `var(--sunset-gradient)`;
	} else {
		console.log("night");
		return `var(--nighttime-gradient)`;
	}
}
