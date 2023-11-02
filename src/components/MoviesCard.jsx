import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';





const MoviesCard = (props) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies(props.sectionTitle);
    }, []);

    
    //  const fetchMovies = async (sectionTitle) => {
    //     if (sectionTitle === 'Trending') {
    //         var {data} = await axios.get(`http://localhost:8000/api/get-movies`);
    //     } else if (sectionTitle === 'Now Playing') {
    //         var {data} = await axios.get(`http://localhost:8000/api/get-movies`);
    //     } else {
    //         var {data} = await axios.get(`http://localhost:8000/api/get-movies`);
    //         console.log(JSON.stringify(data))
    //     } // if else-if else-if

    //     const search_results = data.movies.filter((data.movies) => data.movies.title.includes(searchQuery))

        
    //     setMovies(JSON.parse(data));
    // };
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
            <div className='movies'>
                {movies.map(movie => (
                    <div key={movie.id}>
                        <MovieCard key={movie.id} movie={movie} poster={movie.poster_path} />
                    </div>
                ))}
            </div>
            <Link to='trending'><button className='CTA-button-one'>View all</button></Link>
        </div>
    )
}

export default MoviesCard;