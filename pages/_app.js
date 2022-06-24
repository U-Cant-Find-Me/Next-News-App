import '../styles/globals.css'
import Toolbar from '../components/Toolbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toolbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
