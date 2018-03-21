import Head from './Head'
import Header from './Header'

const Layout = (props) => [
  <Head key="head" />,
  <Header key="header" />,
  props.children
]

export default Layout
