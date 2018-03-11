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
  if (typeof props.temperature == null) {
    return null
  }
  const date = new Date()
  const day = date.getDate()
  const month = months[date.getMonth()]
  const city = 'Москва'
  const dayString = `${day} ${month}`
  const tempString = `${Math.round(props.temperature)}°`

  return (
    <section>
      <div>
        <div style={weekDayStyle}>{city}</div>
        <div>{dayString}</div>
      </div>
      <div style={tempStyle}>{tempString}</div>
        <style jsx>{`
          section {
            width: 260px;
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
