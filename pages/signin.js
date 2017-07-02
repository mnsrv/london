import React, { Component } from 'react'
import { graphql, withApollo, compose } from 'react-apollo'
import cookie from 'cookie'
import Link from 'next/link'
import gql from 'graphql-tag'

import withData from '../lib/withData'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import App from '../components/App'

class Signin extends Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    return { loggedInUser }
  }

  render () {
    const { loggedInUser, client } = this.props
    return (
      <App loggedInUser={loggedInUser} client={client}>
        <h1>Это закрытый аккаунт.</h1>
        {/* this.props.signin is the mutation function provided by apollo below */}
        <form onSubmit={this.props.signin}>
          <input type='email' placeholder='Логин' name='email' required /><br />
          <input type='password' placeholder='Пароль' name='password' required /><br />
          <button>Подписаться</button>
        </form>
      </App>
    )
  }
};

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  graphql(
    // The `signinUser` mutation is provided by graph.cool by default
    gql`
      mutation Signin($email: String!, $password: String!) {
        signinUser(email: { email: $email, password: $password }) {
          token
        }
      }
    `,
    {
      // Use an unambiguous name for use in the `props` section below
      name: 'signinWithEmail',
      // Apollo's way of injecting new props which are passed to the component
      props: ({
        signinWithEmail,
        // `client` is provided by the `withApollo` HOC
        ownProps: { client }
      }) => ({
        // `signin` is the name of the prop passed to the component
        signin: (event) => {
          event.preventDefault()
          event.stopPropagation()

          signinWithEmail({
            variables: {
              email: event.target.elements['email'].value,
              password: event.target.elements['password'].value
            }
          }).then(({ data: { signinUser: { token } } }) => {
            // Store the token in cookie
            document.cookie = cookie.serialize('token', token, {
              maxAge: 30 * 24 * 60 * 60 // 30 days
            })

            // Force a reload of all the current queries now that the user is
            // logged in
            client.resetStore().then(() => {
              // Now redirect to the homepage
              redirect({}, '/')
            })
          }).catch((error) => {
            // Something went wrong, such as incorrect password, or no network
            // available, etc.
            // console.error(error)
          })
        }
      })
    }
  )
)(Signin)
