import Head from './Head'
import Header from './Header'

const Layout = (props) => [
  <Head />,
  <Header />,
  <main>
    {props.children}
  </main>
]

export default Layout
