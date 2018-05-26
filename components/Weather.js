export default (props) => {
  if (typeof props.temperature == null) {
    return null
  }

  const city = 'Москве'
  const tempString = `${Math.round(props.temperature)}°C`

  return [
    <h3 key="title">{`Погода в ${city}`}</h3>,
    <p key="body">{tempString}</p>
  ]
}
