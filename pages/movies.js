import fetch from "isomorphic-unfetch"

import Layout from '../components/Layout'
import Movies from '../components/Movies'

const MoviesPage = (props) => {
  return (
    <Layout>
      <h2>Фильмы</h2>
      <p>В хорошем качестве без смс</p>
      <Movies movies={props.movies} />
    </Layout>
  )
}

export const getMovies = async function() {
  const res = await fetch(`https://api.mansurov.me/movies`)
  const data = await res.json()

  return data.data.reverse()
}

MoviesPage.getInitialProps = async function() {
  const movies = await getMovies()

  return {
    movies
  }
}

export default MoviesPage
