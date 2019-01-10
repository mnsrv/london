export default (props) => {
  if (typeof props.temperature == null) {
    return null
  }

  const tempString = `${props.temperature > 0 ? '+' : ''}${Math.round(props.temperature)}°`

  return (
    <div style={{ padding: '1.5em', backgroundColor: 'white', borderRadius: 20, boxShadow: '0 2px 4px rgba(204, 204, 204, 0.5)' }}>
      <h3>Москва {props.emoji}</h3>
      <p style={{ textAlign: 'center', fontSize: '3em', lineHeight: 1 }}>{tempString}</p>
    </div>
  )
}
