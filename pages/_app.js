import "../css/index.css";
import "../css/style.css";
import Head from "next/head";
import Layout from "../components/layout";
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import dynamic from "next/dynamic";

const Scroll = dynamic(
  () => {
    import("tw-elements")
    return new Promise(()=><></>);
  },
  { ssr: false }
);


const progress = new ProgressBar({
  size: 2,
  color: '#6D25BF',
  className: 'bar-of-progress',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Scroll />
      <Layout>
        <Head>
          <title>Rental</title>
          <meta
            name="Description"
            content="Sydney Rental"
          />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
