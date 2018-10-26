import Head from 'next/head'

import Header from './Header'
import '../static/style.css'

const Layout = (props) => [
  <Head key="head">
    <title>Саша Мансуров</title>
    <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700&amp;subset=cyrillic" rel="stylesheet" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112751787-1"></script>
    <script dangerouslySetInnerHTML={{__html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());
      gtag('config', 'UA-112751787-1');
    `}}></script>
  </Head>,
  <Header key="header" />,
  <main key="main">{props.children}</main>
]

export default Layout
