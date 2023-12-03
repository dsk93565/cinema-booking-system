import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'
import axios from 'axios';

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



    // Filled Form Checker For Basic Information Section
    const isAddMovieFormFilled = (title && category && cast && director && producer && synopsis && reviews && trailer && rating && poster_path);

    const userToken = localStorage.getItem('userToken');
    
    const handleSubmit = async() => {

        const movieInfoExport = {
            userToken,
            category,
            cast,
            director,
            producer,
            synopsis,
            reviews,
            trailer,
            rating,
            title,
            poster_path,
        }

        console.log(JSON.stringify(movieInfoExport));

        await axios.post('http://localhost:8000/api/admin/add-movie', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieInfoExport),
        }).then(function (response) {
            if (response.status === 403)
                console.log("Not Authorized");
            console.log(response);
        }).catch(function(error) {
            console.log("Error adding movie: ", error.message);
        });
          
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
                                    <label className='movie-info-label'>Genre</label>
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
                        <button disabled={!isAddMovieFormFilled} className='admin-movie-button' type='submit' onClick={handleSubmit}>Add Movie</button>
                    </div>
                </div>
        </div>
    );
}