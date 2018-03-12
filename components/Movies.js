import { months } from '../utils/date'

const renderMovie = ({ id, title, watched_date }) => {
  const movieDate = new Date(watched_date)
  const day = movieDate.getDate()
  const month = months[movieDate.getMonth()]
  const year = movieDate.getFullYear() === new Date().getFullYear() ? '' : movieDate.getFullYear()
  const date = `${day} ${month} ${year}`

  return (
    <div key={id}>
      <h3>{title}</h3>
      <span>{date}</span>
    </div>
  )
}

const Movies = (props) => {
  if (typeof props.movies == null) {
    return null
  }

  return props.movies.map(renderMovie)
}

export default Movies
