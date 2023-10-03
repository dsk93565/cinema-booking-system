import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import '../stylings/temporary.css';

const SearchBar = () => {
    const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie?';
    
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [temp, setTemp] = useState(false);
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDUxN2RlYjc3N2I4NmNjY2M5MTYzOGM4NzBjMWI4OSIsInN1YiI6IjY1MTYyOGU4YTE5OWE2MDBjNDljZTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fucbYcepOY0pWh2WQI7Zkyy29pOADVUfv9YdpPdXruk';
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const query_url = `${SEARCH_PATH}query=${query}&language=en-US`;
        console.log(query_url);

        const options = {
            method: 'GET',
            url: query_url,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };

        axios
            .request(options)
            .then(function (response) {
                setMovies(response.data.results);
                setTemp(true);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return (
        <>
            <form className='search-bar' onSubmit={handleSubmit}>
                <input 
                    type='text' placeholder='Search' className='search-input'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='search-icon-wrapper' >
                    <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
                </button>
            </form>
            <div className={`temporary-search-results ${temp ? 'is-active' : ''}`}>
                {movies && movies.map(movie => (
                    <div className='temporary-search-result'>
                        <div>{movie.title}</div>
                        <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title} className='search-result-image' />
                    </div>
                ))}
                <div onClick={() => setTemp(false)} className='temp-close'>Close</div>
            </div>
        </>
    )
}

export default SearchBar;