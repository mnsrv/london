import Head from './Head'
import Header from './Header'

const Layout = (props) => [
  <Head key="head" />,
  <Header key="header" />,
  <main key="main">
    {props.children}
  </main>
]

export default Layout
