import Head from 'next/head'

import Header from './Header'

const Layout = (props) => [
  <Head key="head">
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>Саша Мансуров</title>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112751787-1"></script>
    <script dangerouslySetInnerHTML={{__html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());
      gtag('config', 'UA-112751787-1');
    `}}></script>
    <link rel="stylesheet" href="/static/style.css" />
  </Head>,
  <Header key="header" />,
  <main key="main">{props.children}</main>
]

export default Layout
