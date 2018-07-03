import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'
import Weather from '../components/Weather'
import Calendar from '../components/Calendar'
import { localeMonthsGenitive } from '../utils/date'
import { Match, getWorldCupData, getMatches } from './worldcup'

const IndexWorldCup = ({ matches, teams, stadiums }) => {
  const todayMatches = matches.filter((item) => {
    const now = new Date()
    const date = new Date(Number(item[0]))
    const nowString = `${now.getDate()} ${localeMonthsGenitive[now.getMonth()]}`
    const dateString = `${date.getDate()} ${localeMonthsGenitive[date.getMonth()]}`
    return nowString === dateString
  })
  if (todayMatches.length === 0) {
    const now = new Date()
    const nextMatchDay = matches.find(item => Number(item[0]) > now.getTime())
    const nextMatch = nextMatchDay[1][0]
    const nextMatchDate = new Date(nextMatch.date)
    const nextMatchDateString = `${nextMatchDate.getDate()} ${localeMonthsGenitive[nextMatchDate.getMonth()]}`
    return (
      <div>
        <h3>Чемпионат мира</h3>
        <p>Следующий матч {nextMatchDateString}</p>
      </div>
    )
  }
  return (
    <div>
      <h3>Чемпионат мира</h3>
      {todayMatches.map((item) => {
        const now = new Date()
        const date = new Date(Number(item[0]))
        const nowString = `${now.getDate()} ${localeMonthsGenitive[now.getMonth()]}`
        const dateString = `${date.getDate()} ${localeMonthsGenitive[date.getMonth()]}`

        return (
          <div key={item[0]}>
            {item[1].map(match => <Match key={match.name} match={match} teams={teams} stadiums={stadiums} />)}
          </div>
        )
      })}
    </div>
  )
}

const Index = (props) => {
  return (
    <Layout>
      <article className="article_flex">
        <section>
          <Calendar />
        </section>
        <section>
          <IndexWorldCup matches={props.matches} teams={props.teams} stadiums={props.stadiums} />
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
  const { groups, knockout, stadiums, teams } = await getWorldCupData()
  const groupMatches = getMatches(groups)
  const knockoutMatches = getMatches(knockout)
  const matches = groupMatches.concat(knockoutMatches)

  return {
    temperature,
    groups, matches, stadiums, teams
  }
}

export default Index
