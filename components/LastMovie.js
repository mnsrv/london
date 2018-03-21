import ActiveLink from '../components/ActiveLink'
import { dateDiffInDays, months } from '../utils/date'

const LastMovie = (props) => {
  if (!props.movies) {
    return null
  }

  const lastMovie = props.movies[0]
  const movieDate = new Date(lastMovie.watched_date)
  const differenceInDays = Math.abs(dateDiffInDays(movieDate, new Date()))
  if (differenceInDays > 7) {
    return null
  }
  const day = movieDate.getDate()
  const month = months[movieDate.getMonth()]
  const date = `${day} ${month}`

  return (
    <section style={{ backgroundColor: '#ddd' }}>
      <p>{date} я <ActiveLink href="/movies">посмотрел фильм</ActiveLink> «{lastMovie.title}»</p>
    </section>
  )
}

export default LastMovie
