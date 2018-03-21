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

const rateBackgroundColors = ['#AAA', '#BBB', '#CCC', '#DDD', '#EEE']
const rateEmojis = ['💩', '🤢🤢', '😌😌😌', '👏🏻👏🏻👏🏻👏🏻', '😍😍😍😍😍']

const renderTileMovie = ({ id, title, poster, year }) => {
  const backgroundImage = poster ? `url(https://image.tmdb.org/t/p/w185${poster})` : ''
  return (
    <div key={id} className="movie-tile" title={`${title} (${year})`}>
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
  const ratingInFive = Math.floor(rating / 2) - 1
  const backgroundColor = rateBackgroundColors[ratingInFive]

  return (
    <section key={id} style={{ backgroundColor }}>
      <p>{poster && <img style={posterStyle} src={src} />}{watchedDateString}</p>
      <h3>{title} <small style={{ fontWeight: 'normal', color: '#aaa' }}>{year}</small></h3>
      <span>{rateEmojis[ratingInFive]}</span>
    </section>
  )
}

const Movies = (props) => {
  if (typeof props.movies == null) {
    return null
  }

  if (props.mode === 'list') {
    return props.movies.map(renderListMovie)
  }
  if (props.mode === 'tile') {
    return (
      <div style={containerTileStyle}>
        {props.movies.map(renderTileMovie)}
      </div>
    )
  }
  return null
}

export default Movies
