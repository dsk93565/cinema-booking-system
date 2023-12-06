import '../stylings/admin.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddMovie from '../components/AddMovie';
import AddShowing from '../components/AddShowing';

const ManageMovies = () => {

  const [movies, setMovies] = useState([]);
  const [addMovieModal, setAddMovieModal] = useState(false);
  const [scheduleMovieModal, setScheduleMovieModal] = useState(false);

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
            <button className='CTA-button-one' onClick={() => setAddMovieModal(true)}>Add movie</button>            
            <button className='CTA-button-one' onClick={() => setScheduleMovieModal(true)}>Schedule movie</button>
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
                <div className='admin-button-container'>
                  <button className='admin-movie-button'>Hide Movie</button>
                  <button className='admin-movie-button'>Edit Movie</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/** Add Movie Modal */}
        {addMovieModal && (<AddMovie onClose={() => setAddMovieModal(false)}></AddMovie>)}

        {/** Add Showing Modal */}
        {scheduleMovieModal && (<AddShowing onClose={() => setScheduleMovieModal(false)}></AddShowing>)}
    </section>
  )
}

export default ManageMovies;