import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Weather from '../components/Weather'
import Calendar from '../components/Calendar'
import LastMovie from '../components/LastMovie'

const Index = (props) => {
  return (
    <Layout>
      <article className="article_flex">
        <section>
          <Calendar />
        </section>
        <section>
          <Weather temperature={props.temperature} emoji={props.emoji} />
        </section>
        <section>
          <LastMovie movies={props.movies} />
        </section>
      </article>
    </Layout>
  )
}

const getWeather = async function() {
  const res = await fetch(`https://api.mansurov.me/weather`)
  const data = await res.json()

  return data
}
export const getMovies = async function() {
  const res = await fetch('https://api.mansurov.me/movies')
  const movies = await res.json()

  return movies.sort((a, b) => new Date(b.watched_date) - new Date(a.watched_date))
}

Index.getInitialProps = async function() {
  const { emoji, temperature } = await getWeather()
  const movies = await getMovies()  

  return {
    movies,
    emoji,
    temperature
  }
}

export default Index
