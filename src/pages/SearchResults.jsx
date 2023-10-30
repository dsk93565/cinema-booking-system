import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataContext } from '../DataContext';
import '../stylings/search.css';

const SearchResults = () => {
  const { data } = useDataContext();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Replace 'YOUR_BACKEND_URL' with the actual URL of your Django backend
        const BACKEND_URL = 'http://localhost:8000/api/search'; // Adjust the URL as needed

        // Make a GET request to your Django API endpoint for movie search
        const response = await axios.get(`${BACKEND_URL}/movies/?search=${data}`);
        
        // Assuming your API returns an array of movies in the 'results' property
        setSearchResults(response.data.results);
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
        <div className='search-results-list'>
          {searchResults && searchResults.map((movie) => (
            <div className='search-result' key={movie.id}>
              <img
                src={`http://localhost:8000${movie.poster_url}`} // Update with your Django image URL
                alt={movie.title}
                className='search-result-image'
              />
              <div>{movie.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
