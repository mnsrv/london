import React from 'react'
import fetch from "isomorphic-unfetch"

import Layout from '../components/Layout'
import Movies from '../components/Movies'

export default class MoviesPage extends React.Component {
  static async getInitialProps() {
    const movies = await getMovies()
    return { movies }
  }

  state = {}

  render() {
    return (
      <Layout>
        <article>
          <section style={{ backgroundColor: 'rgb(20,24,28)' }}>
            <Movies movies={this.props.movies} />
          </section>
        </article>
      </Layout>
    )
  }
}

export const getMovies = async function() {
  const res = await fetch(`https://api.mansurov.me/movies`)
  const data = await res.json()

  return data.data.reverse()
}
