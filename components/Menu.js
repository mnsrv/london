import React, { Component } from 'react'
import cookie from 'cookie'
import Link from 'next/link'
import Router from 'next/router'

import redirect from '../lib/redirect'

const SmartLink = ({ href, name, route }) => {
  if (href === route) {
    return <span style={{ marginRight: 20 }}>{name}</span>
  }
  return (
    <Link href={href}><a style={{ marginRight: 20 }}>{name}</a></Link>
  )
}

export default class Menu extends Component {
  constructor() {
    super()

    this.state = {
      route: ''
    }
  }

  componentDidMount() {
    this.setState({ route: Router.route })
  }

  render() {
    const userName = this.props.loggedInUser.user.name
    return (
      <div style={{ marginBottom: 25 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h1 style={{ margin: '0 20px 0 0' }}>Привет, {userName}</h1>
          {this.renderSignOut()}
        </div>
        <div>
          <SmartLink href="/" name="главная" route={this.state.route} />
          <SmartLink href="/test" name="тестовая" route={this.state.route} />
        </div>
      </div>
    )
  }

  renderSignOut = () => <span style={{ cursor: 'pointer' }} onClick={this.signout}>👋🏼</span>

  signout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    this.props.client.resetStore().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/signin')
    })
  }
}
