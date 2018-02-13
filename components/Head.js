import Head from 'next/head'

export default () => (
  <Head>
    <title>Александр Мансуров</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <style>{`
      * {
        box-sizing: border-box;
      }
      body {
        font-family: Helvetica Neue,Arial,sans-serif;
        margin: 0;
        background-color: rgb(43,113,183);
        background-image: url(static/net.png);
      }
    `}</style>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112751787-1"></script>
    <script dangerouslySetInnerHTML={{__html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());
      gtag('config', 'UA-112751787-1');
    `}}></script>
  </Head>
)
