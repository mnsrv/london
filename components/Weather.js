const weekDayStyle = {
  fontSize: 20,
  fontWeight: 500,
  marginBottom: 5
}
const tempStyle = {
  fontSize: 48,
  fontWeight: 100,
  lineHeight: 1,
  letterSpacing: -0.68
}

const weekdays = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота'
]
const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

export default (props) => {
  if (typeof props.temp === undefined) {
    return null
  }
  const date = new Date();
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  return (
    <section>
      <div>
        <div style={weekDayStyle}>{weekday}</div>
        <div>{day} {month}</div>
      </div>
      <div style={tempStyle}>{Math.round(props.temp)}°</div>
        <style jsx>{`
          section {
            width: 270px;
            background-color: white;
            box-shadow: 0 5px 20px 0 rgba(0,0,0,0.05);
            border-radius: 10px;
            padding: 15px 15px 15px 20px;
            display: flex;
            justify-content: space-between;
          }
          @media (max-width: 414px) {
            section {
              width: 100%;
            }
          }
       `}</style>
    </section>
  )
}
