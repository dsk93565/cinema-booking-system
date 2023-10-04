import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const SearchBar = () => {
    const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie?';
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDUxN2RlYjc3N2I4NmNjY2M5MTYzOGM4NzBjMWI4OSIsInN1YiI6IjY1MTYyOGU4YTE5OWE2MDBjNDljZTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fucbYcepOY0pWh2WQI7Zkyy29pOADVUfv9YdpPdXruk';
    
    const [searchInput, setSearchInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [temp, setTemp] = useState(false);

    const handleSearchInputFocus = () => {
        setSearchInput(true);
    }

    const handleSearchInputBlur = () => {
        setSearchInput(false);
    }

    const handleEmptyInput = (e) => {
        setInputValue(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const query_url = `${SEARCH_PATH}query=${query}&language=en-US`;

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
            .then((response) => {
                setMovies(response.data.results);
                setTemp(true);
            })
            .catch((error) => {
                console.error(error);
            }) // request then catch
    }

    return (
        <form className={`search-bar ${searchInput ? 'is-active' : ''}`} onSubmit={handleSubmit}>
            <input 
                type='text' placeholder='Search' onFocus={handleSearchInputFocus} onBlur={handleSearchInputBlur}
                onChange={e => {handleEmptyInput(e); setQuery(e.target.value)}} className='search-input'
            />
            <Link to='search-results'>
                <button type='submit' disabled={!inputValue} className='search-icon-wrapper' >
                    <FontAwesomeIcon icon='fa-solid fa-magnifying-glass fa-1x' className='search-icon' />
                </button>
            </Link>
        </form>
    )
}

export default SearchBar;