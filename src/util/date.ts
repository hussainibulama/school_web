export const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());
  return tomorrow.toISOString().split('T')[0];
};
