import ActiveLink from '../components/ActiveLink'
import { localeMonthsGenitive } from '../utils/date'
import { rateEmojis } from '../utils/movie'

const LastMovie = ({ movies }) => {
  if (!movies) {
    return null
  }

  return (
    <div style={{ padding: '1.5em', backgroundColor: '#13171b', borderRadius: 20, color: 'white', boxShadow: '0 2px 4px rgba(19, 23, 27, 0.5)' }}>
      <h3>Кино</h3>
      {movies.map(movie => {
        const poster = movie.poster ? `https://image.tmdb.org/t/p/w342${movie.poster}` : ''
        const rating = movie.rating / 2

        return (
          <div key={movie.id.toString()} style={{ display: 'flex', marginTop: '1em' }}>
            {poster && <div style={{ marginRight: 20 }}><img src={poster} style={{ width: 114, borderRadius: 8, margin: 0 }} /></div>}
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
