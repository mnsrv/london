import fetch from 'isomorphic-unfetch'

import { getMovies } from './movies'
import Layout from '../components/Layout'
import Weather from '../components/Weather'
import LastMovie from '../components/LastMovie'
import { months } from '../utils/date'

const Index = (props) => {
  const date = new Date()
  const day = date.getDate()
  const month = months[date.getMonth()]
  const dayString = `${day} ${month}`

  return (
    <Layout>
      <h2>{dayString}</h2>
      <Weather temperature={props.temperature} />
      <LastMovie movies={props.movies} />
    </Layout>
  )
}

const getWeather = async function() {
  const res = await fetch(`http://api.mansurov.me/weather`)
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
