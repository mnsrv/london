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
    const { groups, matches, stadiums, teams } = this.props
    const remainingMatches = matches.filter(item => new Date().getTime() <= Number(item[0]))

    return (
      <Layout>
        <article>
          <section>
            <table className="table_nowrap">
              <thead>
                <tr>
                  <th colSpan={6} />
                  {remainingMatches.map((item) => {
                    const date = new Date(Number(item[0]))
                    const dateString = `${date.getDate()} ${localeMonthsGenitive[date.getMonth()]}`
                    return <th key={dateString}>{dateString}</th>
                  })}
                </tr>
              </thead>
              {Object.entries(groups).map((group, index, array) => {
                const groupTeams = this.getGroupTeams(group)
                return (
                  <tbody key={group[0]}>
                    {groupTeams.map(((item, index) => {
                      const team = teams[item.id - 1]
                      return (
                        <tr key={item.id}>
                          <td>{index === 0 ? group[0].toUpperCase() : ''}</td>
                          <td>{team.emojiString} {localeCountries[team.name]}</td>
                          <td>{item.points}</td>
                          {item.matches.map((match) => {
                            if (!match.finished) {
                              return <td key={match.name} />
                            }
                            const a = match.home_team === item.id ? match.home_result : match.away_result
                            const b = match.home_team === item.id ? match.away_result : match.home_result
                            const competitor = match.home_team === item.id ? match.away_team : match.home_team
                            const backgroundColor = this.getBackgroundColor(a, b)
                            return <td key={match.name} style={{ backgroundColor }}>{a} – {b} {teams[competitor - 1].emojiString}</td>
                          })}
                          {remainingMatches.map((remainingMatch) => {
                            const match = item.matches.find(match => remainingMatch[1].map(item => item.name).includes(match.name))
                            if (!match || match.finished) {
                              return <td key={remainingMatch[0]} />
                            }
                            const competitor = match.home_team === item.id ? match.away_team : match.home_team
                            const now = new Date()
                            const date = new Date(match.date)
                            const nowPlaying = now.getTime() - date.getTime() > 0
                            if (nowPlaying) {
                              const a = match.home_team === item.id ? match.home_result : match.away_result
                              const b = match.home_team === item.id ? match.away_result : match.home_result
                              return <td key={timeString}>{a} – {b} {teams[competitor - 1].emojiString}</td>
                            }
                            const timeString = `${date.getHours()}:${getFullMinutes(date)}`
                            const stadium = stadiums[match.stadium - 1]
                            const place = localeCities[stadium.city]
                            return (
                              <td key={timeString} style={{ position: 'relative' }}>
                                <p style={{ fontSize: '0.6em', color: 'rgb(170, 170, 170)', marginBottom: 0, position: 'absolute', top: 0, lineHeight: '1em' }}>{place}</p>
                                {timeString} {teams[competitor - 1].emojiString}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    }))}
                    {index < array.length - 1 && (
                      <tr>
                        <td colSpan={6 + remainingMatches.length}></td>
                      </tr>
                    )}
                  </tbody>
                )
              })}
            </table>
          </section>
        </article>
      </Layout>
    )
  }

  getGroupTeams = (group) => {
    const groupTeams = []
    group[1].matches.map((item) => {
      const homeScore = item.finished ? item.home_result : 0
      const homeMiss = item.finished ? item.away_result : 0
      const homePoints = item.finished ? this.getPoints(item.home_result, item.away_result) : 0
      const awayScore = item.finished ? item.away_result : 0
      const awayMiss = item.finished ? item.home_result : 0
      const awayPoints = item.finished ? this.getPoints(item.away_result, item.home_result) : 0
      groupTeams[item.home_team] = {
        id: item.home_team,
        matches: groupTeams[item.home_team] ? [...groupTeams[item.home_team].matches, item] : [item],
        score: groupTeams[item.home_team] ? groupTeams[item.home_team].score + homeScore : homeScore,
        miss: groupTeams[item.home_team] ? groupTeams[item.home_team].miss + homeMiss : homeMiss,
        points: groupTeams[item.home_team] ? groupTeams[item.home_team].points + homePoints : homePoints
      }
      groupTeams[item.away_team] = {
        id: item.away_team,
        matches: groupTeams[item.away_team] ? [...groupTeams[item.away_team].matches, item] : [item],
        score: groupTeams[item.away_team] ? groupTeams[item.away_team].score + awayScore : awayScore,
        miss: groupTeams[item.away_team] ? groupTeams[item.away_team].miss + awayMiss : awayMiss,
        points: groupTeams[item.away_team] ? groupTeams[item.away_team].points + awayPoints : awayPoints
      }
    })

    return groupTeams.sort(this.sortTeams)
  }

  getPoints = (firstScore, secondScore) => {
    if (firstScore > secondScore) {
      return 3
    } else if (firstScore === secondScore) {
      return 1
    }
    return 0
  }

  getBackgroundColor = (firstScore, secondScore) => {
    if (firstScore > secondScore) {
      return '#90EE90'
    } else if (firstScore === secondScore) {
      return 'lightgray'
    }
    return '#EE9090'
  }

  sortTeams = (a, b) => {
    if (b.points > a.points) {
      return 1
    }
    if (b.points < a.points) {
      return -1
    }
    if (b.score - b.miss > a.score - a.miss) {
      return 1
    }
    if (b.score - b.miss < a.score - a.miss) {
      return -1
    }
    return b.id - a.id
  }
}

export const getWorldCupData = async function() {
  const res = await fetch('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json')
  const data = await res.json()

  return data
}
