import '../stylings/admin.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddMovie from '../components/AddMovie';
import AddShowing from '../components/AddShowing';
import EditMovie from '../components/EditMovie';

const ManageMovies = () => {

  const [movies, setMovies] = useState([]);
  const [playingMovies, setPlayingMovies] = useState([]);
  const [addMovieModal, setAddMovieModal] = useState(false);
  const [editMovieModal, setEditMovieModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(0);
  const [scheduleMovieModal, setScheduleMovieModal] = useState(false);
  const [midHidden, setMidHidden] = useState(0);
  const user_token = localStorage.getItem('userToken');

  const fetchMovies = async () => {
    try {
        const moviesList = [];
        const response = await axios.get(`http://localhost:8000/api/get-movies`);
        console.log(response.data);
        setPlayingMovies(response.data["Now Playing"]);
        setMovies(moviesList.concat(response.data["Now Playing"],
                                    response.data["Coming Soon"],
                                    response.data["Trending"]));
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
  };

  const handlePostShowing = (e, mid, pid, rid, date) => {
    e.preventDefault();
    async function postShowing () {
        axios.post('http://localhost:8000/api/admin/add-showing', {
            user_token: user_token,
            mid: mid,
            pid: pid,
            rid: rid,
            date: date
        }).then(function (response) {
            if (response.status === 403)
                console.log("Not Authorized");
            console.log(response);
        }).catch(function(error) {
            console.log("Error adding movie: ", error.message);
        });
    }
    postShowing();
  }

  const hideMovie = (event, movie) => {
      event.preventDefault();
      setMidHidden(movie.mid);
      const movieData = {
            user_token: user_token,
            mid: movie.mid,
            release_date: movie.release_date,
            category: movie.category,
            cast: movie.cast,
            director: movie.director,
            producer: movie.producer,
            synopsis: movie.synopsis,
            reviews: movie.reviews,
            trailer: movie.trailer,
            rating: movie.rating,
            title: movie.title,
            poster_path: movie.poster_path,
            msid: 1,
      }

      console.log(JSON.stringify(movieData));

      async function postMovie (movieInfoExport) {
          await axios.post('http://localhost:8000/api/admin/edit-movie', {
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(movieInfoExport),
          }).then(function (response) {
              if (response.status === 403)
                  console.log("Not Authorized");
              console.log(response.data.success);
              window.dispatchEvent(new Event('movieHidden'));
          }).catch(function(error) {
              console.log("Error adding movie: ", error.message);
          });
      }

      postMovie(movieData);
  }

  const handleEditMovie = (mid) => {
    setEditMovieModal(true);
    setMovieToEdit(mid);
  }

  useEffect( () => {
    fetchMovies();
  }, []);

  useEffect( () => {
    window.addEventListener('movieHidden', () => {
      setMovies(movies.map(movie => {
        if(movie.mid === midHidden)
          return null;
      }))
      fetchMovies();
    })
  }, []);

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
                  <button className='admin-movie-button' onClick={(event) => hideMovie(event, movie)}>Hide Movie</button>
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
        {scheduleMovieModal && (<AddShowing onClose={() => setScheduleMovieModal(false)} movies={playingMovies} handlePostShowing={handlePostShowing}></AddShowing>)}
    </section>
  )
}

export default ManageMovies;