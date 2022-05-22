/* eslint-disable react/react-in-jsx-scope */
import Document, { Head, Html, Main, NextScript } from 'next/document';

class myDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css"
            type="text/css"
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default myDocument;
