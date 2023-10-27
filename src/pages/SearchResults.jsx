import { useEffect, useState } from 'react';
import { useDataContext } from '../DataContext';
import axios from 'axios';
import '../stylings/search.css';

const SearchResults = () => {
  const { data } = useDataContext();
  const [searchResults, setSearchResults] = useState([]);

  // Temporary
  const SEARCH_PATH = 'https://api.themoviedb.org/3/search/movie?';
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDUxN2RlYjc3N2I4NmNjY2M5MTYzOGM4NzBjMWI4OSIsInN1YiI6IjY1MTYyOGU4YTE5OWE2MDBjNDljZTA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fucbYcepOY0pWh2WQI7Zkyy29pOADVUfv9YdpPdXruk';
  useEffect(() => {
    const query_url = `${SEARCH_PATH}query=${data}&language=en-US`;
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
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      }) // request then catch
  });

  return (
    <section className='search-results section-wrapper'>
        <div className='section-container-top'>
            <h2>Search results</h2>
            <div className='search-results-list'>
              {searchResults && searchResults.map(movie => (
                <div className='search-result'>
                  <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title} className='search-result-image' />
                  <div>{movie.title}</div>
                </div>
              ))}
            </div>
        </div>
    </section>
  )
}

export default SearchResults;