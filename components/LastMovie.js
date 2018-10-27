import ActiveLink from '../components/ActiveLink'
import { localeMonthsGenitive } from '../utils/date'
import { rateEmojis } from '../utils/movie'

const LastMovie = ({ movies }) => {
  if (!movies) {
    return null
  }

  return (
    <div>
      <h3>Кино</h3>
      {movies.map(movie => {
        const poster = movie.poster ? `https://image.tmdb.org/t/p/w92${movie.poster}` : ''
        const rating = movie.rating / 2

        return (
          <div key={movie.id.toString()} style={{ display: 'flex', marginTop: '1em' }}>
            {poster && <img src={poster} style={{ borderRadius: 8, marginLeft: 0, marginRight: 20 }} />}
            <div>
              <div>
                <span>{movie.title}</span>
              </div>
              <div style={{ color: '#777' }}>
                <span>{movie.original_title}</span>
              </div>
              <div style={{ fontSize: '0.8em', color: rating > 3 ? 'yellow' : '#C0C0C0', marginTop: '0.3rem' }}>
                <span>{'★'.repeat(rating)}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LastMovie
