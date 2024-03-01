export function getTheTime(createdAtDate: any) {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const timeDifference = currentDate.getTime() - (new Date(createdAtDate)).getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];
    for (const interval of intervals) {
        const count = Math.floor(secondsDifference / interval.seconds);
        if (count > 0) {
            return count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`;
        }
    }
    return "just now";
}