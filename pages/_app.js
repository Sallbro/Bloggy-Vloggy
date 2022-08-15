import Navbar from '../components/Navbar'
import '../styles/globals.scss'
import '../components/Firebaseconfig'
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
function MyApp({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
