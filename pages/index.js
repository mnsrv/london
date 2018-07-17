import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Weather from '../components/Weather'
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

  return {
    temperature
  }
}

export default Index
