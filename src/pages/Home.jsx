import Hero from '../components/Hero';
import Trending from '../components/Trending';
import Showings from '../components/Showings';
import TemporaryComingSoon from '../components/TemporaryComingSoon';
import PromoSubscription from '../components/PromoSubscription';
import Footer from '../components/Footer';
import '../stylings/home.css';

const Home = () => {
  return (
    <div className='home'>
    <Hero />
    <Trending />
    <Showings />
    <TemporaryComingSoon /> {/* Temporary component until a feature is implemented */}
    <PromoSubscription />
    <Footer />
    </div>
  )
}

export default Home;