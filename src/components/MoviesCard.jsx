import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MoviesCard = (props) => {
  const sectionRef = useRef(null);

  // Fetch and Categorize Movies Functionality
  const [moviesByState, setMoviesByState] = useState({
    'Now Playing': [],
    'Trending': [],
    'Coming Soon': [],
  });

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/get-movies');
      const { data } = response;
      setMoviesByState(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } // try catch
  };

  const currentMovies = moviesByState[props.sectionTitle] || [];

  // Scroll Functionality
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleScroll = () => {
    const moviesContainer = sectionRef.current;
    const isAtBeginning = moviesContainer.scrollLeft === 0;
    const isAtEnd = Math.abs(moviesContainer.scrollWidth - (moviesContainer.scrollLeft + moviesContainer.clientWidth)) <= 1;

    setAtStart(isAtBeginning);
    setAtEnd(isAtEnd);
  };

  const handleScrollToStart = () => {
    sectionRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollToEnd = () => {
        sectionRef.current.scrollTo({
            left: sectionRef.current.scrollWidth,
            behavior: 'smooth',
        });
  };

  // Singular Flipped Card Functionality
  const [flippedCard, setFlippedCard] = useState(null);

  // Listener
  useEffect(() => {
    fetchMovies(props.sectionTitle);
    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      currentSectionRef.addEventListener('scroll', handleScroll);

      return () => {
        currentSectionRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, [props.sectionTitle]);

  return (
    <div className='movies-card'>
      <h2>{props.sectionTitle}</h2>
      <div className='movies-container-wrapper'>
        <div className={`scroll-container left-scroll ${atStart ? 'hidden' : ''}`} onClick={handleScrollToStart}>
          <button className='arrow-button left-arrow-button'>❮</button>
        </div>
        <div className='movies-container' ref={sectionRef}>
          {currentMovies.map(movie => (
            <div key={movie.mid}>
              <MovieCard
                movie={movie} 
                origin='MoviesCard'
                isFlipped={flippedCard === movie.mid} 
                onFlip={() => setFlippedCard(prev => (prev === movie.mid ? null : movie.mid))}
              />
              <h3 className='movie-title'>{movie.title}</h3>
            </div>
          ))}
          <div className={`scroll-container right-scroll ${atEnd ? 'hidden' : ''}`} onClick={handleScrollToEnd}>
            <button className='arrow-button right-arrow-button'>❯</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesCard;