export function timeFormat(time) {
	let hour = '';
	if (time > 60) hour = Math.round(time / 60) + 'h ';
	return hour + Math.round(time % 60) + ' min'
}