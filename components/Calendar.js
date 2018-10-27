import { getWeeks, localeMonths } from '../utils/date'

const Row = ({ children }) => <div style={{ display: 'flex' }}>{children}</div>
const Cell = ({ children, today = false }) => {
  const style = {
    fontFamily: 'monospace',
    fontSize: '1.5rem',
    flex: 1,
    textAlign: 'right',
    padding: '0 5px',
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: today ? 'red' : 'transparent'
  }
  return <div style={style}>{children}</div>
}

const Calendar = () => {
  const weeks = getWeeks()
  const date = new Date()
  const today = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const firstDate = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0)
  const daysCount = lastDate.getDate()

  return [
    <h3 key="title" style={{ textTransform: 'capitalize' }}>{localeMonths[month]}</h3>,
    <div key="body" style={{ marginTop: -5, marginLeft: -10, marginRight: -10 }}>
      {weeks.map(({ week, days }) => (
        <Row key={week.toString()}>
          {days.map((day, index) => day > 0
            ? <Cell key={day} today={day === today}>{day}</Cell>
            : <Cell key={`${(day+index).toString()}-empty`} />
          )}
        </Row>
      ))}
    </div>
  ]
}

export default Calendar
