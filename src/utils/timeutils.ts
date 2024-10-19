export const getTimeDifference = (createdAt: string): string => {
  const currentTime = new Date();
  const createdAtTime = new Date(createdAt);
  const timeDifference = currentTime.getTime() - createdAtTime.getTime();

  if (timeDifference < 5000) {
    // If less than 5 seconds
    return "Just now";
  }

  const minutes = Math.floor(timeDifference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${Math.floor(timeDifference / 1000)}s`; // Converting milliseconds to seconds
  }
};
