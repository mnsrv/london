import React, { Component } from 'react'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link'

import withData from '../lib/withData'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import App from '../components/App'

class Test extends Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    if (!loggedInUser.user) {
      // No money – no honey
      // Throw them back to the main page
      redirect(context, '/')
    }

    return { loggedInUser }
  }

  render () {
    const { loggedInUser, client } = this.props
    return (
      <App client={client} loggedInUser={loggedInUser} title="тестовая">
        <p>Секретный тест</p>
      </App>
    )
  }
};

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Test)
