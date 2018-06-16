import fetch from 'isomorphic-unfetch'

import { getMovies } from './movies'
import Layout from '../components/Layout'
import Weather from '../components/Weather'
import LastMovie from '../components/LastMovie'
import Calendar from '../components/Calendar'
import { localeMonthsGenitive } from '../utils/date'
import { Match, getWorldCupData, getMatches } from './worldcup'

const Index = (props) => {
  return (
    <Layout>
      <article>
        <section>
          <Calendar />
        </section>
        <section>
          <div>
            <h3>Чемпионат мира ⚽🏆</h3>
            {props.matches.map((item) => {
              const date = new Date()
              const dateString = `${date.getDate()} ${localeMonthsGenitive[date.getMonth()]}`
              if (item[0] !== dateString) {
                return null
              }
              return (
                <div key={item[0]}>
                  {item[1].map(match => <Match match={match} teams={props.teams} stadiums={props.stadiums} />)}
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <Weather temperature={props.temperature} />
        </section>
        <section>
          <LastMovie movies={props.movies} />
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
  const movies = await getMovies()
  const { groups, stadiums, teams } = await getWorldCupData()
  const matches = getMatches(groups)

  return {
    movies: movies.sort((a, b) => new Date(b.watched_date) - new Date(a.watched_date)),
    temperature,
    groups, matches, stadiums, teams
  }
}

export default Index
