const timeLapses = [
  { lapse: "year", equivalent: 3.154e10 },
  { lapse: "month", equivalent: 2.628e9 },
  { lapse: "week", equivalent: 6.048e8 },
  { lapse: "day", equivalent: 8.64e7 },
  { lapse: "hour", equivalent: 3.6e6 },
  { lapse: "minute", equivalent: 60000 },
  { lapse: "second", equivalent: 1000 },
];

export const getFollowAge = (followed_at: string) => {
  const parsedFollowedTime = Date.parse(followed_at);
  const currentTime = Date.now();
  const followAgeInMs = currentTime - parsedFollowedTime;
  const followAge = timeLapses
    .map((timeLapse) => {
      return {
        lapse: timeLapse.lapse,
        equivalent: Math.round(followAgeInMs / timeLapse.equivalent),
      };
    })
    .reduce((acc, curr) => {
      if (acc.equivalent === 0) {
        return curr;
      } else if (acc.equivalent <= curr.equivalent) {
        return acc;
      }

      return curr;
    });

  return `${followAge.equivalent} ${followAge.lapse.concat(followAge.equivalent > 1 ? "s" : "")}`;
};
