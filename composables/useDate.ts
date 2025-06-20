export const useTodayPeriod = (): {
  start: Date;
  end: Date;
} => {
  const now = new Date();

  return {
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0),
  };
};
