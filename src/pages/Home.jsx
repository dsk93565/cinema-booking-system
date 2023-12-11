import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import MoviesCard from '../components/MoviesCard';
import Footer from '../components/Footer';
import '../stylings/home.css';


const Home = () => {

  const [isLoading, setIsLoading] = useState(true);

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
      const response = await axios.post('http://localhost:8000/api/email-subscription',
                                        { email, timeout: 5000 });
      if (response.status === 200 && response.data.success === 1) {
        alert('Subscription successful:', response.data);
      } else {
        alert('Subscription failed:', response.data.error);
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED')
        console.error("Request timed out");
      else
        alert('Subscription failed:', error.message);
    }
  };

  const sectionRef = useRef(null);

  // Fetch and Categorize Movies Functionality
  const [moviesByState, setMoviesByState] = useState({
    'Now Playing': [],
    'Trending': [],
    'Coming Soon': [],
  });

  const fetchMovies = async () => {
    try {
      await axios.get('http://localhost:8000/api/get-movies', {timeout: 5000}).then(function(response) {
        setMoviesByState(response.data);
      }).catch(function (error) {
        if (error.code === 'ECONNABORTED') {
          console.error('The request timed out');
        }
        }).finally(function() {
          setIsLoading(false);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    } // try catch
  };

  useEffect(() => {
    fetchMovies();
  
    const params = new URLSearchParams(window.location.search);
    const scrollToSection = params.get('scrollTo');
  
    if (scrollToSection) {
      const targetSection = document.getElementById(scrollToSection);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className='home'>
      <Hero />
      <section id='trending' className='section-wrapper'> {/* Trending */}
        <div className='section-container'>
          <MoviesCard moviesByState={moviesByState}
                      sectionTitle='Trending'
                      flippedCard={flippedCard}
                      onFlip={handleFlip}
                      isLoading={isLoading}/>
        </div>
      </section>
      <section id='now-playing' className='section-wrapper'> {/* Now Playing */}
        <div className='section-container'>
          <MoviesCard moviesByState={moviesByState}
                      sectionTitle='Now Playing'
                      flippedCard={flippedCard}
                      onFlip={handleFlip}
                      isLoading={isLoading}/>
        </div>
      </section>
      <section id='coming-soon' className='section-wrapper'> {/* Coming Soon */}
        <div className='section-container'>
          <MoviesCard moviesByState={moviesByState}
                      sectionTitle='Coming Soon'
                      flippedCard={flippedCard}
                      onFlip={handleFlip}
                      isLoading={isLoading}/>
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