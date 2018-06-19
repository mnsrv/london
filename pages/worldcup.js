import React from 'react'
import fetch from "isomorphic-unfetch"

import Layout from '../components/Layout'
import { localeMonthsGenitive, getFullMinutes } from '../utils/date'
import { localeCountries, localeCities, localeStadiums } from '../utils/worldcup'

export const Match = ({ match, teams, stadiums }) => {
  const date = new Date(match.date)
  const now = new Date()
  const homeTeam = teams[match.home_team - 1]
  const awayTeam = teams[match.away_team - 1]
  const stadium = stadiums[match.stadium - 1]
  const nowPlaying = now.getTime() - date.getTime() > 0 && !match.finished
  const time = nowPlaying ? 'Идёт сейчас.' : `${date.getHours()}:${getFullMinutes(date)}`
  const color = nowPlaying ? 'rgb(255,40,0)' : '#aaa'
  const place = stadium.city === 'Moscow' ? `${localeCities[stadium.city]}. ${localeStadiums[stadium.name]}` : `${localeCities[stadium.city]}`

  const timePlaceString = match.finished ? place : `${time} ${place}`
  const string = `${localeCountries[homeTeam.name]} ${homeTeam.emojiString} ${match.home_result != null ? match.home_result : ''} : ${match.away_result != null ? match.away_result : ''} ${awayTeam.emojiString} ${localeCountries[awayTeam.name]}`

  return (
    <div style={{ marginBottom: '1em' }}>
      <p style={{ fontSize: '0.6em', color, marginBottom: 0 }}>{timePlaceString}</p>
      <p style={{ marginTop: 0 }}>{string}</p>
    </div>
  )
}

export const getMatches = (groups) => {
  const matchesByDate = Object.entries(groups)
    .map(item => item[1].matches)
    .reduce((a, b) => a.concat(b), [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce(((result, item, index, array) => {
      const date = new Date(item.date)
      const dayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
      const dateTimestamp = dayDate.getTime()
      if (result[dateTimestamp]) {
        result[dateTimestamp].push(item)
      } else {
        result[dateTimestamp] = [item]
      }
      return result
    }), {})
  return Object.entries(matchesByDate)
}

export default class WorldCupPage extends React.Component {
  static async getInitialProps() {
    const { groups, stadiums, teams } = await getWorldCupData()
    const matches = getMatches(groups)

    return { groups, matches, stadiums, teams }
  }

  render() {
    const { matches, stadiums, teams } = this.props

    return (
      <Layout>
        <article>
          <section>
            {matches.map((item) => {
              const now = new Date()
              const date = new Date(Number(item[0]))
              const dateString = `${date.getDate()} ${localeMonthsGenitive[date.getMonth()]}`
              if (now.getTime() > Number(item[0])) {
                return null
              }
              return (
                <div key={item[0]}>
                  <h5>{dateString}</h5>
                  {item[1].map(match => <Match key={match.name} match={match} teams={teams} stadiums={stadiums} />)}
                </div>
              )
            })}
          </section>
        </article>
      </Layout>
    )
  }
}

export const getWorldCupData = async function() {
  const res = await fetch('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json')
  const data = await res.json()

  return data
}
