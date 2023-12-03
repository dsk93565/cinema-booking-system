import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';


const MoviesCard = (props) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies(props.sectionTitle);
    }, []);

    const sectionRef = useRef(null);

    const scrollSection = (dir) => {
        if (sectionRef.current) {
            const currentScrollLeft = sectionRef.current.scrollLeft;
            const sectionWidth = sectionRef.current.offsetWidth;
            
            sectionRef.current.scrollTo({
                left: currentScrollLeft + (sectionWidth * dir),
                behavior: 'smooth', // You can use 'auto' for instant scrolling
            });
        }
    };
        
    const fetchMovies = async (sectionTitle, categoryFilter) => {
        let response;
    
        try {
            response = await axios.get(`http://localhost:8000/api/get-movies`);
            const { data } = response;
    
            if (sectionTitle === 'Trending' || sectionTitle === 'Now Playing' || sectionTitle === 'Coming Soon') {
                // No filtering needed for these sections
                setMovies(data.movies);
            } else {
                // Filter the movies based on the category
                const filteredMovies = data.movies.filter(movie => movie.category === categoryFilter);
                setMovies(filteredMovies);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <div className='movies-card'>
            <h2>{props.sectionTitle}</h2>
            <div className='movies-container' ref={sectionRef}>
                {movies.map(movie => (
                    <div key={movie.mid}>
                        <MovieCard movie={movie} origin="MoviesCard" />
                        <h3 className='movie-title'>{movie.title}</h3>
                    </div>
                ))}
            </div>
            <div>
                <button className='scroll-button' onClick={() => scrollSection(-1)}>❮</button>
                <button className='scroll-button' onClick={() => scrollSection(1)}>❯</button>
            </div>
        </div>
    )
}

export default MoviesCard;