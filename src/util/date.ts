import moment from 'moment';

export const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());
  return tomorrow.toISOString().split('T')[0];
};

export const formatDate = (date?: string) => {
  if (date) {
    return moment(date).format('DD MMM YYYY');
  }
  return '';
};

export const toDateInputValue = (date: string | Date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return ''; // invalid date
  return d.toISOString().split('T')[0]; // returns YYYY-MM-DD
};
