import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from './MovieCard';

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '8d517deb777b86cccc91638c870c1b89';

const MoviesCard = (props) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies(props.sectionTitle);
    }, []);

    const fetchMovies = async (sectionTitle) => {
        if (sectionTitle === 'Trending') {
            var {data} = await axios.get(`${API_URL}trending/movie/day?language=en-US`, {
                params: {
                    api_key: API_KEY
                }
            });
        } else if (sectionTitle === 'Now Playing') {
            var {data} = await axios.get(`${API_URL}movie/now_playing?language=en-US&page=1`, {
                params: {
                    api_key: API_KEY
                }
            });
        } else if (sectionTitle === 'Coming Soon') {
            var {data} = await axios.get(`${API_URL}movie/upcoming?language=en-US&page=1`, {
                params: {
                    api_key: API_KEY
                }
            });
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