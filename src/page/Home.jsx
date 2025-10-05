import './Style.css'
import Header from '../components/Header/Header.jsx'
import News from '../components/News/News.jsx'
import MoviesAreShowing from '../components/Movie/MoviesAreShowing.jsx'
import MoviesCommingSoon from '../components/Movie/MoviesComing.jsx'
import Footer from '../components/Footer/Footer.jsx'
import ThanhVienCGV from '../components/ThanhVienCGV/ThanhVienCGV.jsx'
import TinTucVaUuDai from '../components/ThanhVienCGV/TinTucVaUuDai.jsx'
import Promos from '../components/ThanhVienCGV/Promos.jsx'

function Home() {

  return (
    <div className='min-h-screen bg-gradient-to-b from-black via-gray-900 to-black'>
      <Header />
      <News />
      <MoviesAreShowing />
      <MoviesCommingSoon />
      <ThanhVienCGV />
      <TinTucVaUuDai />
      <Promos />
      <Footer />
      
    </div>

  )
}

export default Home
