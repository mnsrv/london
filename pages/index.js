import fetch from 'isomorphic-unfetch'

import { getMovies } from './movies'
import Layout from '../components/Layout'
import Weather from '../components/Weather'
import LastMovie from '../components/LastMovie'
import { months } from '../utils/date'

const Index = (props) => {
  return (
    <Layout>
      <article>
        <section style={{ backgroundColor: 'lightblue' }}>
          <h2>{dayString}</h2>
          {renderHoliday()}
          <Weather temperature={props.temperature} />
        </section>
        <LastMovie movies={props.movies} />
      </article>
    </Layout>
  )
}

const getWeather = async function() {
  const res = await fetch(`https://api.mansurov.me/weather`)
  const data = await res.json()

  return data.temperature
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
