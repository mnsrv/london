const Calendar = () => {
  const date = new Date()
  const year = date.getFullYear()
  const firstDayInMS = (new Date(year, 0, 1)).getTime()
  const lastDayInMS = (new Date(year + 1, 0, 1)).getTime()
  const nowInMS = (new Date()).getTime()
  const progress = Math.floor((nowInMS - firstDayInMS) / (lastDayInMS - firstDayInMS) * 100)
  return (
    <div style={{ padding: '1.5em', backgroundColor: 'white', borderRadius: 20, boxShadow: '0 2px 4px rgba(204, 204, 204, 0.5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{ textTransform: 'capitalize' }}>{year}</h3>
        <h3 style={{ opacity: 0.2 }}>{progress}%</h3>
      </div>
      <div>
        <div style={{ width: 300, backgroundColor: 'black', padding: 5 }}>
          <div style={{ backgroundColor: 'white' }}>
            <div style={{ height: 20, width: `${progress}%`, backgroundColor: 'pink' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
