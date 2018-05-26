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
          <section className="section_grow" style={{ backgroundColor: 'rgb(20,24,28)' }}>
            <Movies movies={this.props.movies} />
          </section>
        </article>
      </Layout>
    )
  }
}

export const getMovies = async function() {
  const res = await fetch('https://api.mansurov.me/movies')
  const movies = await res.json()

  return movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
}
