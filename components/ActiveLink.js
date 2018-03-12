import Link from 'next/link'
import { withRouter } from 'next/router'

const ActiveLink = ({ router, href, children }) => {
  const active = router.pathname === href
  if (active) {
    return children
  }
  return <Link prefetch href={href}><a>{children}</a></Link>
}

export default withRouter(ActiveLink)
