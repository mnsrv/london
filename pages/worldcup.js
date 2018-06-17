import React from 'react'
import fetch from "isomorphic-unfetch"

import Layout from '../components/Layout'
import { localeMonthsGenitive, getFullMinutes } from '../utils/date'
import { localeCountries, localeCities, localeStadiums } from '../utils/worldcup'

export const Match = ({ match, teams, stadiums }) => {
  const date = new Date(match.date)
  const homeTeam = teams[match.home_team - 1]
  const awayTeam = teams[match.away_team - 1]
  const stadium = stadiums[match.stadium - 1]

  const time = `${date.getHours()}:${getFullMinutes(date)}`
  const place = stadium.city === 'Moscow' ? `${localeCities[stadium.city]}. ${localeStadiums[stadium.name]}` : `${localeCities[stadium.city]}`

  const string = `${localeCountries[homeTeam.name]} ${homeTeam.emojiString} ${match.home_result != null ? match.home_result : ''} : ${match.away_result != null ? match.away_result : ''} ${awayTeam.emojiString} ${localeCountries[awayTeam.name]}`

  return (
    <div style={{ marginBottom: '1em' }}>
      <p style={{ fontSize: '0.6em', color: '#aaa', marginBottom: 0 }}>{time} {place}</p>
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
      const dateString = `${date.getDate()} ${localeMonthsGenitive[date.getMonth()]}`
      if (result[dateString]) {
        result[dateString].push(item)
      } else {
        result[dateString] = [item]
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
              return (
                <div key={item[0]}>
                  <h5>{item[0]}</h5>
                  {item[1].map(match => <Match match={match} teams={teams} stadiums={stadiums} />)}
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
