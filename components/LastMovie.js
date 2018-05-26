import ActiveLink from '../components/ActiveLink'
import { localeMonthsGenitive } from '../utils/date'
import { rateEmojis } from '../utils/movie'

const LastMovie = ({ movies }) => {
  if (!movies) {
    return null
  }

  const lastMovies = movies.slice(0, 3)

  return (
    <div>
      <h3>Три последних фильма</h3>
      {lastMovies.map(movie => {
        const movieDate = new Date(movie.watched_date)
        const day = movieDate.getDate()
        const month = localeMonthsGenitive[movieDate.getMonth()]
        const date = `${day} ${month}`
        const ratingInFive = Math.floor(movie.rating / 2) - 1

        return <p key={movie.id.toString()}>{date} – «{movie.title}» – {rateEmojis[ratingInFive]}</p>
      })}
    </div>
  )
}

export default LastMovie
