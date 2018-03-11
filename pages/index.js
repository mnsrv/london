import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

import Layout from '../components/Layout'
import Weather from '../components/Weather'

const Index = (props) => (
  <Layout>
    <Weather temperature={props.temperature} />
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch(`http://api.mansurov.me/weather`)
  const data = await res.json()

  return {
    temperature: data.temperature
  }
}

export default Index
