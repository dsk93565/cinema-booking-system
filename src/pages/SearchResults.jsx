import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylings/search.css';
import axios from 'axios';

const SearchResults = () => {
  const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie?';
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDUxN2RlYjc3N2I4NmNjY2M5MTYzOGM4NzBjMWI4OSIsInN1YiI6IjY1MTYyOGU4YTE5OWE2MDBjNDljZTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fucbYcepOY0pWh2WQI7Zkyy29pOADVUfv9YdpPdXruk';
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
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
        })
        .catch((error) => {
            console.error(error);
        }) // request then catch
};

  return (
    <section className='search-results section-wrapper'>
      <div className='section-container-top'>
        <h2>Search results</h2>
      </div>
    </section>
  )
}

export default SearchResults;