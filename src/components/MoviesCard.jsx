import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MoviesCard = (props) => {
    const [moviesByState, setMoviesByState] = useState({
        'Now Playing': [],
        'Trending': [],
        'Coming Soon': [],
    });
    const [flippedCard, setFlippedCard] = useState(null); // State to track flipped card

    useEffect(() => {
        fetchMovies(props.sectionTitle);
    }, [props.sectionTitle]);

    const sectionRef = useRef(null);

    const fetchMovies = async (sectionTitle) => {
        try {
            const response = await axios.get('http://localhost:8000/api/get-movies');
            const { data } = response;
            setMoviesByState(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleFlip = (movieId) => {
        if (flippedCard === movieId) {
            setFlippedCard(null);
        } else {
            setFlippedCard(movieId);
        }
    };

    const currentMovies = moviesByState[props.sectionTitle] || [];

    return (
        <div className='movies-card'>
            <h2>{props.sectionTitle}</h2>
            <div className='movies-container' ref={sectionRef}>
                {currentMovies.map(movie => (
                    <div key={movie.mid}>
                        <MovieCard 
                            movie={movie} 
                            origin='MoviesCard'
                            isFlipped={flippedCard === movie.mid} 
                            onFlip={handleFlip} />
                        <h3 className='movie-title'>{movie.title}</h3>
                    </div>
                ))}
            </div>
            <div className='scroll-buttons'>
                <button className='scroll-button' onClick={() => sectionRef.current.scrollTo({
                    left: sectionRef.current.scrollLeft - sectionRef.current.offsetWidth,
                    behavior: 'smooth'
                })}>❮</button>
                <button className='scroll-button' onClick={() => sectionRef.current.scrollTo({
                    left: sectionRef.current.scrollLeft + sectionRef.current.offsetWidth,
                    behavior: 'smooth'
                })}>❯</button>
            </div>
        </div>
    );
}

export default MoviesCard;
