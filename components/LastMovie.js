import ActiveLink from '../components/ActiveLink'
import { months } from '../utils/date'

const LastMovie = (props) => {
  if (!props.movies) {
    return null
  }

  const lastMovie = props.movies[0]
  const movieDate = new Date(lastMovie.watched_date)
  const day = movieDate.getDate()
  const month = months[movieDate.getMonth()]
  const date = `${day} ${month}`

  return <p>{date} я <ActiveLink href="/movies">посмотрел фильм</ActiveLink> «{lastMovie.title}»</p>
}

export default LastMovie
