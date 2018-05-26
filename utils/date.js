export const localeMonthsGenitive = [
  'января', 'февраля',
  'марта', 'апреля', 'мая',
  'июня', 'июля', 'августа',
  'сентября', 'октября', 'ноября',
  'декабря'
]
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const dateDiffInDays = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}
