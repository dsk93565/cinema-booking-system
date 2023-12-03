import '../stylings/admin.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageMovies = () => {

  const [movies, setMovies] = useState([]);

  useEffect( () => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    let response;

    try {
        response = await axios.get(`http://localhost:8000/api/get-movies`);
        const { data } = response;
        console.log(data.movies)
        setMovies(data.movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

  return (
    <section className='admin-section-wrapper'>
        <div className='admin-container-narrow'>
            <h2>Manage movies</h2>
            <button className='CTA-button-one'>Add movie</button>
            <button className='CTA-button-one'>Hide movie</button>
            <button className='CTA-button-one'>Schedule movie</button>
        </div>
        <div className='admin-body'>
          {movies.map(movie => (
            <div className='admin-result' key={movie.mid}>
              <div className='admin-result-row'>
                <div className='admin-result-pic'>
                  <img src={movie.poster_path} className='admin-movie-poster'></img>
                </div>
                <div className='admin-result-text'>
                    <p><strong>Genre:</strong> {movie.category}</p>
                    <p><strong>Cast:</strong> {movie.cast}</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                    <p><strong>Producer:</strong> {movie.producer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default ManageMovies;