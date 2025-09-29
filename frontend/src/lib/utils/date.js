export function formatDate(startStr, endStr) {
	if (!startStr) return '';

	const start = new Date(startStr);
	const end = endStr ? new Date(endStr) : null;

	const pad = (n) => n.toString().padStart(2, '0');
	const formatDate = (date) =>
		`${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
	const formatDayMonth = (date) =>
		`${pad(date.getDate())}.${pad(date.getMonth() + 1)}`;
	const formatTime = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

	const hasRealTime = (date) => date && (date.getHours() !== 0 || date.getMinutes() !== 0);

	const startHasTime = hasRealTime(start);
	const endHasTime = hasRealTime(end);

	const sameDay =
		end &&
		start.getDate() === end.getDate() &&
		start.getMonth() === end.getMonth() &&
		start.getFullYear() === end.getFullYear();

	const sameMonth =
		end &&
		start.getMonth() === end.getMonth() &&
		start.getFullYear() === end.getFullYear();

	const sameYear = end && start.getFullYear() === end.getFullYear();

	// No end date
	if (!end) {
		if (startHasTime) return `${formatDate(start)} alle ${formatTime(start)}`;
		return formatDate(start);
	}

	// Same day
	if (sameDay) {
		if (!startHasTime && endHasTime) {
			return `${formatDate(start)} fino alle ${formatTime(end)}`;
		} else if (startHasTime && endHasTime) {
			return `${formatDate(start)} dalle ${formatTime(start)} alle ${formatTime(end)}`;
		} else if (startHasTime) {
			return `${formatDate(start)} alle ${formatTime(start)}`;
		} else {
			return formatDate(start);
		}
	}

	// Date range without times
	if (!startHasTime && !endHasTime) {
		if (sameMonth) {
			return `${pad(start.getDate())}-${pad(end.getDate())}.${pad(start.getMonth() + 1)}.${start.getFullYear()}`;
		} else if (sameYear) {
			return `${formatDayMonth(start)}-${formatDayMonth(end)}.${start.getFullYear()}`;
		} else {
			return `${formatDate(start)}-${formatDate(end)}`;
		}
	}

	// Date range with times
	return `Dal ${formatDate(start)}${startHasTime ? ' alle ' + formatTime(start) : ''} al ${formatDate(end)}${endHasTime ? ' alle ' + formatTime(end) : ''}`;
}

export function isPast(datetime) {
	if (!datetime) return false;
	var now = new Date();
	var start = new Date(datetime);
	return now >= start;
}