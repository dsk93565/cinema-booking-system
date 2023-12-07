import { useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import MoviesCard from '../components/MoviesCard';
import Footer from '../components/Footer';
import '../stylings/home.css';


const Home = () => {

  // Single Flipped Card Functionality
  const [flippedCard, setFlippedCard] = useState(null);
  const handleFlip = (movieId) => {
    if (flippedCard === movieId) {
      setFlippedCard(null);
    } else {
      setFlippedCard(movieId);
    }
  };

  // Email Subscription Functionality
  const handleEmailSubscription = async (email) => {
    try {
      const response = await axios.post('http://localhost:8000/api/email-subscription', { email });
  
      if (response.status === 200 && response.data.success === 1) {
        alert('Subscription successful:', response.data);
      } else {
        alert('Subscription failed:', response.data.error);
      }
    } catch (error) {
      alert('Subscription failed:', error.message);
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
            <button onClick={handleEmailSubscription} className='CTA-button-one'>Subscribe</button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home;