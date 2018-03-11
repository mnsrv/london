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
        div { padding: 20px }
      }
   `}</style>
  </div>
)

export default Layout
