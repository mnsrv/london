import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

import Layout from '../components/Layout'
import Weather from '../components/Weather'

const Index = (props) => (
  <Layout>
    <Weather temp={props.temp} />
  </Layout>
)

Index.getInitialProps = async function() {
  const city = 'Moscow'
  const appid = WEATHER_API_KEY
  const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${appid}`)
  const data = await res.json()

  return {
    temp: data.main.temp
  }
}

export default Index
