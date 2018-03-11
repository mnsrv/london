import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

import Layout from '../components/Layout'
import Weather from '../components/Weather'

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

const Index = (props) => {
  const date = new Date()
  const day = date.getDate()
  const month = months[date.getMonth()]
  const dayString = `${day} ${month}`

  return (
    <Layout>
      <article>
        <h2>{dayString}</h2>
        <Weather temperature={props.temperature} />
      </article>
    </Layout>
  )
}

Index.getInitialProps = async function() {
  const res = await fetch(`http://api.mansurov.me/weather`)
  const data = await res.json()

  return {
    temperature: data.temperature
  }
}

export default Index
