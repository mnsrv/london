import Header from './Header'
import '../static/style.css'

const Layout = (props) => [
  <Header key="header" />,
  <main key="main">{props.children}</main>
]

export default Layout
