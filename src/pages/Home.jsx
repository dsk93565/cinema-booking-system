import { useState } from 'react';
import Hero from '../components/Hero';
import MoviesCard from '../components/MoviesCard';
import Footer from '../components/Footer';
import '../stylings/home.css';


const Home = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const handleFlip = (movieId) => {
    if (flippedCard === movieId) {
      setFlippedCard(null);
    } else {
      setFlippedCard(movieId);
    }
  };

  return (
    <div className='home'>
      <Hero />
      <section className='section-wrapper'> {/* Trending */}
        <div className='section-container'>
          <MoviesCard sectionTitle='Trending' flippedCard={flippedCard} onFlip={handleFlip} />
        </div>
      </section>
      <section className='section-wrapper'> {/* Now Playing */}
        <div className='section-container'>
          <MoviesCard sectionTitle='Now Playing' flippedCard={flippedCard} onFlip={handleFlip} />
        </div>
      </section>
      <section className='section-wrapper'> {/* Coming Soon */}
        <div className='section-container'>
          <MoviesCard sectionTitle='Coming Soon' flippedCard={flippedCard} onFlip={handleFlip} />
        </div>
      </section>
      <section className='promo-subscription section-wrapper'>
        <div className='section-container'>
          <h2>Want to receive promotional codes and weekly newsletters?</h2>
          <form>
            <input type='email' placeholder='Email' className='user-info-input' />
            <button className='CTA-button-one'>Subscribe</button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home;