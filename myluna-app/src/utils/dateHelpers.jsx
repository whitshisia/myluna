import { format, parseISO, isToday, isPast, isFuture, differenceInDays } from 'date-fns';

export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return '';
  try {
    return format(parseISO(date), formatStr);
  } catch {
    return format(new Date(date), formatStr);
  }
};

export const formatDateShort = (date) => {
  return formatDate(date, 'MMM d');
};

export const formatDay = (date) => {
  return formatDate(date, 'EEEE');
};

export const isDateToday = (date) => {
  try {
    return isToday(parseISO(date));
  } catch {
    return isToday(new Date(date));
  }
};

export const isDatePast = (date) => {
  try {
    return isPast(parseISO(date));
  } catch {
    return isPast(new Date(date));
  }
};

export const isDateFuture = (date) => {
  try {
    return isFuture(parseISO(date));
  } catch {
    return isFuture(new Date(date));
  }
};

export const daysBetween = (date1, date2) => {
  try {
    return differenceInDays(parseISO(date2), parseISO(date1));
  } catch {
    return differenceInDays(new Date(date2), new Date(date1));
  }
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const getCurrentWeekNumber = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = (now - start) / 86400000;
  return Math.ceil((diff + start.getDay() + 1) / 7);
};

export const getWeekDays = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};

export const getMonthName = (month) => {
  const names = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return names[month];
};

export const getMonthNameShort = (month) => {
  const names = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return names[month];
};