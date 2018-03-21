import React from 'react'
import fetch from "isomorphic-unfetch"

import Layout from '../components/Layout'
import Movies from '../components/Movies'

export default class MoviesPage extends React.Component {
  static async getInitialProps() {
    const movies = await getMovies()
    return { movies }
  }

  state = {
    mode: 'list' // list tile
  }

  render() {
    return (
      <Layout>
        <article>
          <section style={{ backgroundColor: 'lightblue' }}>
            <h2>Фильмы</h2>
            <p>Показать {this.renderListButton()} или {this.renderTileButton()}</p>
            {this.state.mode === 'tile' && <Movies mode={this.state.mode} movies={this.props.movies} />}
          </section>
          {this.state.mode === 'list' && <Movies mode={this.state.mode} movies={this.props.movies} />}
        </article>
      </Layout>
    )
  }

  renderListButton = () => {
    if (this.state.mode === 'list') {
      return <span>списком</span>
    }
    return <a style={{ cursor: 'default' }} onClick={() => this.setState({ mode: 'list' }) }>списком</a>
  }

  renderTileButton = () => {
    if (this.state.mode === 'tile') {
      return <span>плиткой</span>
    }
    return <a style={{ cursor: 'default' }} onClick={() => this.setState({ mode: 'tile' }) }>плиткой</a>
  }
}

export const getMovies = async function() {
  const res = await fetch(`https://api.mansurov.me/movies`)
  const data = await res.json()

  return data.data.reverse()
}
