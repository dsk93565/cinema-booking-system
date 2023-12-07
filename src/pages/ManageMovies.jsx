import '../stylings/admin.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddMovie from '../components/AddMovie';
import AddShowing from '../components/AddShowing';
import EditMovie from '../components/EditMovie';

const ManageMovies = () => {

  const [movies, setMovies] = useState([]);
  const [addMovieModal, setAddMovieModal] = useState(false);
  const [editMovieModal, setEditMovieModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(0);
  const [scheduleMovieModal, setScheduleMovieModal] = useState(false);

  useEffect( () => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
        const moviesList = [];
        const response = await axios.get(`http://localhost:8000/api/get-movies`);
        setMovies(moviesList.concat(response.data["Now Playing"], response.data["Coming Soon"], response.data["Trending"]));
        console.log(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
  };

  const handleEditMovie = (mid) => {
    setEditMovieModal(true);
    setMovieToEdit(mid);
  }

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
                  <button className='admin-movie-button' onClick={() => handleEditMovie(movie.mid)}>Edit Movie</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/** Add Movie Modal */}
        {addMovieModal && (<AddMovie onClose={() => setAddMovieModal(false)}></AddMovie>)}

        {/** Edit Movie Modal */}
        {editMovieModal && (<EditMovie onClose={() => setEditMovieModal(false)} movieid={movieToEdit}></EditMovie>)}

        {/** Add Showing Modal */}
        {scheduleMovieModal && (<AddShowing movies={movies} onClose={() => setScheduleMovieModal(false)}></AddShowing>)}
    </section>
  )
}

export default ManageMovies;