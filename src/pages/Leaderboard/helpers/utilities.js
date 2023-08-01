export const getMedalFromIndex = (index) => {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return "";
  }
};

export const getSortedUsers = (users) =>
  users?.sort((a, b) => b.highestScore - a.highestScore) || [];
