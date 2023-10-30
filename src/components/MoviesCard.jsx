import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';





const MoviesCard = (props) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies(props.sectionTitle);
    }, []);

    const fetchMovies = async (sectionTitle) => {
        if (sectionTitle === 'Trending') {
            var {data} = await axios.get(`http://localhost:8000/api/get-movies`);
        } else if (sectionTitle === 'Now Playing') {
            var {data} = await axios.get(`http://localhost:8000/api/get-movies`);
        } else {
            var {data} = await axios.get(`http://localhost:8000/api/get-movies`);
            console.log(JSON.stringify(data))
        } // if else-if else-if

        setMovies(data.results);
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