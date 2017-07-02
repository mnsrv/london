import Head from 'next/head'

export default ({ title = 'Это закрытый аккаунт.' }) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <style>{`
      * {
        box-sizing: border-box;
      }
      body {
        font-family: Helvetica Neue,Arial,sans-serif;
        margin: 0;
        background-color: #fafafa;
      }
    `}</style>
  </Head>
)
