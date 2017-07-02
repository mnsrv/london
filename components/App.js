import Head from './Head'
import Menu from './Menu'

export default ({ loggedInUser, client, title, children }) => (
  <div style={{ margin: 25 }}>
    <Head title={title} />
    {loggedInUser.user && <Menu client={client} loggedInUser={loggedInUser} />}
    {children}
  </div>
)
