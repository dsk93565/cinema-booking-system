import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataContext } from '../DataContext';
import MovieCard from '../components/MovieCard'
import '../stylings/search.css';

const SearchResults = () => {
  const { data } = useDataContext();
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const moviesList = [];
        const BACKEND_URL = 'http://localhost:8000/api/get-movies'; // Adjust the URL as needed
        await axios.get(`${BACKEND_URL}`).then(function (response) {
          const results = moviesList.concat(response.data["Now Playing"], response.data["Coming Soon"], response.data["Trending"])
            .filter( (m) => m.title.toLowerCase().includes(data.toLowerCase()));
          setSearchResults(results);
        });
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, [data]);

  return (
    <section className='search-results section-wrapper'>
      <div className='section-container-top'>
        <h2>Search results</h2>
        <ul className='search-results-list'>
          {searchResults && searchResults.map((movie) => (
            <li className='search-result' key={movie.mid}>
              
              <div className='search-results-header'><h2>{movie.title}</h2></div>
              <div className='search-result-row'>
                <div className='search-result-image'>
                  <MovieCard movie={movie} origin="SearchResults" />
                </div>
                <div className='search-result-info'>
                  <p><strong>Genre:</strong> {movie.category}</p>
                  <p><strong>Cast:</strong> {movie.cast}</p>
                  <p><strong>Director:</strong> {movie.director}</p>
                  <p><strong>Producer:</strong> {movie.producer}</p>
                </div> {/*search-result-info*/}
              </div> {/*search-result-row*/}
            </li>
          ))}

          {!searchResults[0] && (<div><h3>No results found.</h3></div>)}
        </ul>
      </div>
    </section>
  );
};

export default SearchResults;