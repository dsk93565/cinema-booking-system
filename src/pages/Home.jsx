import { useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import MoviesCard from '../components/MoviesCard';
import Footer from '../components/Footer';
import '../stylings/home.css';


const Home = () => {
  const categories = [
    { sectionTitle: 'Trending', categoryFilter: '3' },
    { sectionTitle: 'Now Playing', categoryFilter: '2' },
    { sectionTitle: 'Coming Soon', categoryFilter: '4' },
  ];

  const fetchAllMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/get-movies');
      const { data } = response;

      return data.movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  const fetchAndSetMovies = async () => {
    const allMovies = await fetchAllMovies();
    const orderedCategories = ['Trending', 'Now Playing', 'Coming Soon'];
    const categorizedMovies = {};

    orderedCategories.forEach(category => {
      categorizedMovies[category] = [];
    });

    allMovies.forEach(movie => {
      const category = categories.find(cat => cat.sectionTitle === movie.sectionTitle);
      if (category) {
        categorizedMovies[category.sectionTitle].push(movie);
      } // if
    });

    orderedCategories.forEach(category => {
      // Set state or perform any other action with categorizedMovies[category]
    });
  };

  useEffect(() => {
    fetchAndSetMovies();
  }, []);

  return (
    <div className='home'>
      <Hero />
      {categories.map(category => (
        <section key={category.sectionTitle} className='section-wrapper'>
          <div className='section-container'>
            <MoviesCard sectionTitle={category.sectionTitle} categoryFilter={category.categoryFilter} />
          </div>
        </section>
      ))}
      <section className='section-wrapper'> {/* Now Playing */}
        <div className='section-container'>
          <MoviesCard sectionTitle='Now Playing' categoryFilter='2' />
        </div>
      </section>
      <section className='section-wrapper'> {/* Coming Soon */}
        <div className='section-container'>
          <MoviesCard sectionTitle='Coming Soon' categoryFilter='4' />
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