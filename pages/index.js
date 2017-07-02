import React, { Component } from 'react'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link'

import withData from '../lib/withData'
import checkLoggedIn from '../lib/checkLoggedIn'
import App from '../components/App'
import Main from '../components/Main'

class Index extends Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)
    return { loggedInUser }
  }

  constructor() {
    super()

    this.state = {
      showForm: false
    }
  }

  render () {
    const { loggedInUser, client } = this.props
    return (
      <App client={client} loggedInUser={loggedInUser} title="главная">
        {loggedInUser.user ? <Main /> : <div><h1>Это закрытый аккаунт.</h1><p><Link href="/signin"><a>Подпишитесь</a></Link> на этот аккаунт, чтобы смотреть публикуемые здесь фото и видео.</p></div>}
      </App>
    )
  }
};

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Index)
