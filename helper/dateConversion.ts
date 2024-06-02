export function convertDateToTimezone(date: Date, targetOffset: number) {
  // 1. Get the UTC date
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  // 2. Calculate the difference between target and local timezone offset (in minutes)
  const localOffset = date.getTimezoneOffset();
  const timezoneDiff = targetOffset / 60 - localOffset; // Convert targetOffset to minutes

  // 3. Apply the timezone difference to the UTC date (in milliseconds)
  const convertedDate = new Date(utcDate.getTime() + timezoneDiff * 60000);

  // 4. Return the converted date (might not reflect the target timezone formatting)
  return convertedDate;
}
