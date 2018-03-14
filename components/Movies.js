import { months } from '../utils/date'

const containerTileStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: -5
}
const tilePoster = {
  width: '100%',
  paddingBottom: '150%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
const posterStyle = {
  backgroundColor: '#161718',
  borderRadius: 8
}

const rateEmojis = ['💩', '🤢🤢', '😌😌😌', '👏🏻👏🏻👏🏻👏🏻', '😍😍😍😍😍']
const renderTileMovie = ({ id, title, poster, year }) => {
  const backgroundImage = poster ? `url(https://image.tmdb.org/t/p/w185${poster})` : ''
  return (
    <div key={id} style={{ flexBasis: '20%', maxWidth: '20%', padding: 5 }} title={`${title} (${year})`}>
      <div style={{ ...tilePoster, ...posterStyle, backgroundImage }} />
    </div>
  )
}
const renderListMovie = ({ id, title, poster, rating, watched_date, year }) => {
  const src = poster ? `https://image.tmdb.org/t/p/w92${poster}` : ''
  const watchedDate = new Date(watched_date)
  const watchedDay = watchedDate.getDate()
  const watchedMonth = months[watchedDate.getMonth()]
  const watchedYear = watchedDate.getFullYear()
  const watchedYearString = watchedYear === new Date().getFullYear() ? '' : watchedYear
  const watchedDateString = `${watchedDay} ${watchedMonth} ${watchedYearString}`

  return (
    <article key={id}>
      <header>
        <p>{poster && <img style={posterStyle} src={src} />}{watchedDateString}</p>
        <h3>{title} <small style={{ fontWeight: 'normal', color: '#aaa' }}>{year}</small></h3>
        <span>{rateEmojis[Math.floor(rating / 2) - 1]}</span>
      </header>
    </article>
  )
}

const Movies = (props) => {
  if (typeof props.movies == null) {
    return null
  }

  const style = props.mode === 'tile' ? containerTileStyle : {}

  return (
    <div style={style}>
      {props.movies.map(props.mode === 'tile' ? renderTileMovie : renderListMovie)}
    </div>
  )
}

export default Movies
