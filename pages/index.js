import fetch from 'isomorphic-unfetch'

import { getMovies } from './movies'
import Layout from '../components/Layout'
import Weather from '../components/Weather'
import LastMovie from '../components/LastMovie'
import { months } from '../utils/date'
import { holidays } from '../utils/holidays'

const Index = (props) => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const localeMonth = months[month]
  const dayString = `${day} ${localeMonth}`
  let holiday

  if (holidays[month + 1] && holidays[month + 1][day]) {
    holiday = holidays[month + 1][day]
  }
  const renderHoliday = () => {
    if (!holiday) {
      return null
    }
    return (
      <p style={{ color: 'gray' }}>{holiday.emoji} – {holiday.title}</p>
    )
  }


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
