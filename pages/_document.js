import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>Александр Мансуров</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700&amp;subset=cyrillic" rel="stylesheet" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-112751787-1"></script>
          <script dangerouslySetInnerHTML={{__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'UA-112751787-1');
          `}}></script>
          <script dangerouslySetInnerHTML={{__html: `
            (function(d, w, c) {
                w.ChatraID = 'aeSjcHXJXuKpCPZPA';
                var s = d.createElement('script');
                w[c] = w[c] || function() {
                    (w[c].q = w[c].q || []).push(arguments);
                };
                s.async = true;
                s.src = (d.location.protocol === 'https:' ? 'https:': 'http:')
                + '//call.chatra.io/chatra.js';
                if (d.head) d.head.appendChild(s);
            })(document, window, 'Chatra');
          `}}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}