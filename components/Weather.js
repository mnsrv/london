export default (props) => {
  if (typeof props.temperature == null) {
    return null
  }

  const city = 'Москве'
  const tempString = `В ${city} ${Math.round(props.temperature)}°C`

  return <p>{tempString}</p>
}
