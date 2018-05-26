export const localeMonthsGenitive = [
  'января', 'февраля',
  'марта', 'апреля', 'мая',
  'июня', 'июля', 'августа',
  'сентября', 'октября', 'ноября',
  'декабря'
]
export const localeMonths = [
  'январь', 'февраль',
  'март', 'апрель', 'май',
  'июнь', 'июль', 'август',
  'сентябрь', 'октябрь', 'ноябрь',
  'декабрь'
]
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const dateDiffInDays = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
export const getWeekNumber = (d) => {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return weekNo
}

export const getWeeks = () => {
  const weeks = []
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
  const firstDate = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0)
  const daysInMonth = lastDate.getDate()
  let start = 1
  let end = firstDate.getDay() === 0 ? 1 : 7 - firstDate.getDay() + 1

  while (start <= daysInMonth) {
    let array = []
    const endMinusStart = end - start
    const weekNumber = getWeekNumber(new Date(year, month, start))

    for (let i = 0; i < 7; i++) {
      if (endMinusStart === 6) {
        array.push(start + i)
      } else if (start === 1) {
        const value = start + i - (6 - endMinusStart)
        array.push(value > 0 ? value : 0)
      } else {
        const value = start + i
        array.push(value <= end ? value : 0)
      }
    }

    weeks.push({ week: weekNumber, days: array })
    start = end + 1
    end = end + 7
    if (end > daysInMonth) {
      end = daysInMonth
    }
  }

  return weeks
}
