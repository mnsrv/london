import Head from './Head'
import Header from './Header'

const Layout = (props) => (
  <div>
    <Head />
    <Header />
    {props.children}
    <style jsx>{`
      div { padding: 60px }
      @media (max-width: 414px) {
        div { padding: 10px }
      }
   `}</style>
  </div>
)

export default Layout
