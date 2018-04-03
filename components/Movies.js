import { Component } from 'react'

import { months } from '../utils/date'

const containerTileStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: -5
}

const rateEmojis = ['💩', '🤢🤢', '😌😌😌', '👏🏻👏🏻👏🏻👏🏻', '😍😍😍😍😍']

export default class Movies extends Component {
  state = {
    flippedIndex: null
  }

  render() {
    const { movies = [] } = this.props

    return (
      <div style={containerTileStyle}>
        {movies.map(this.renderMovie)}
      </div>
    )
  }

  renderMovie = ({ id, title, poster, rating, year }, index) => {
    const backgroundImage = poster ? `url(https://image.tmdb.org/t/p/w342${poster})` : ''
    const className = index === this.state.flippedIndex ? 'poster__container poster__container_flipped' : 'poster__container'
    const ratingInFive = Math.floor(rating / 2) - 1

    return (
      <div key={id} className={className} onClick={() => { this.flipMovie(index) }}>
        <div className="poster__flipper">
          <div className="poster__side poster__side_front" style={{ backgroundImage }} />
          <div className="poster__side poster__side_back">
            <h5 style={{ color: 'white' }}>{title}</h5>
            <small style={{ fontWeight: 'normal', color: '#89a' }}>{year}</small>
            <p>{rateEmojis[ratingInFive]}</p>
          </div>
        </div>
      </div>
    )
  }

  flipMovie = (index) => {
    if (index === this.state.flippedIndex) {
      this.setState({ flippedIndex: null })
    } else {
      this.setState({ flippedIndex: index })
    }
  }
}
