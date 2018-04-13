import Header from './Header'
import '../static/style.css'

const Layout = (props) => [
  <Header key="header" />,
  props.children
]

export default Layout
