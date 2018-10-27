import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Weather from '../components/Weather'
import LastMovie from '../components/LastMovie'
import Calendar from '../components/Calendar'

const Index = (props) => {
  return (
    <Layout>
      <article className="article_flex">
        <section>
          <Calendar />
        </section>

        <section>
          <Weather temperature={props.temperature} />
        </section>
        <section style={{ backgroundColor: '#13171b', borderRadius: 20, color: 'white' }}>
          <LastMovie movies={props.movies} />
        </section>
      </article>
    </Layout>
  )
}

const getWeather = async function() {
  const res = await fetch(`https://api.mansurov.me/weather`)
  const data = await res.json()

  return data.temperature
}
export const getMovies = async function() {
  const res = await fetch('https://api.mansurov.me/movies')
  const movies = await res.json()

  return movies.sort((a, b) => new Date(b.watched_date) - new Date(a.watched_date))
}

Index.getInitialProps = async function() {
  const temperature = await getWeather()
  const movies = await getMovies()  

  return {
    movies,
    temperature
  }
}

export default Index
