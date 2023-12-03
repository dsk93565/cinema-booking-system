import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'

export default function AddMovie({ onClose }) {
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [producer, setProducer] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [reviews, setReviews] = useState('');
    const [trailer, setTrailer] = useState('');
    const [rating, setRating] = useState('');
    const [poster_path, setPosterPath] = useState('');
    
    const handleSubmit = async() => {

        /* const movieInfoExport = {
            title,
            category,
            cast,
            director,
            producer,
            synopsis,
            reviews,
            trailer,
            rating,
            poster_path,
        } */

        const {data} = await axios.post('http://localhost:8000/api/add-movie', document.querySelector('#addMovieForm'), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
    
        onClose();
    }

    return (
        <div className='modal-wrapper'>
                <div className='admin-modal'>
                    <div className='modal-header'>
                        <div className='modal-title'><h1>Add Movie</h1></div>
                        <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
                    </div>
                    <div className='admin-modal-body'>
                        <form className='add-movie-form' id="addMovieForm">
                            <div className='admin-movie-form-col'>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Title</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setTitle(e.target.value)}></input>
                                </div>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Category</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setCategory(e.target.value)}></input>
                                </div>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Cast</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setCast(e.target.value)}></input>
                                </div>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Director</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setDirector(e.target.value)}></input>
                                </div>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Producer</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setProducer(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='admin-movie-form-col'>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Synopsis</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setSynopsis(e.target.value)}></input>
                                </div>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Reviews</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setReviews(e.target.value)}></input>
                                </div>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Trailer</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setTrailer(e.target.value)}></input>
                                </div>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Rating</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setRating(e.target.value)}></input>
                                </div>
                                <div className='movie-info'>
                                    <label className='movie-info-label'>Poster Image Path</label>
                                    <input type='text' className='add-movie-input' onChange={(e) => setPosterPath(e.target.value)}></input>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                    <div className='modal-footer'>
                        <button className='admin-movie-button' type='submit' onClick={handleSubmit}>Add Movie</button>
                    </div>
                </div>
        </div>
    );
}