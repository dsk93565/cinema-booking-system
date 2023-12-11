import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'
import axios from 'axios';

export default function AddMovie({ onClose, handleMovieSubmit }) {
    
    const [title, setTitle] = useState('');
    const [release_date, setReleaseDate] = useState('');
    const [category, setCategory] = useState('');
    const [cast, setCast] = useState('');
    const [director, setDirector] = useState('');
    const [producer, setProducer] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [reviews, setReviews] = useState('');
    const [trailer, setTrailer] = useState('');
    const [rating, setRating] = useState('');
    const [poster_path, setPosterPath] = useState('');
    const [msid, setStateID] = useState('');
    

    // Returns true until every input is filled.
    const isFormEmpty = (!title || 
                                  !release_date || 
                                  !category || 
                                  !cast ||
                                  !director ||
                                  !producer || 
                                  !synopsis || 
                                  !reviews || 
                                  !trailer || 
                                  !rating || 
                                  !poster_path);
        
    const userToken = localStorage.getItem('userToken');    
    
    return (
        <div className='modal-wrapper'>
                <div className='admin-modal'>
                    <div className='modal-header'>
                        <div className='modal-title'><h1>Add Movie</h1></div>
                        <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault(); // Prevent the default form submission behavior
                        handleMovieSubmit(isFormEmpty, userToken, release_date, category, cast, director,
                            producer, synopsis, reviews, trailer, rating, title,
                            poster_path, msid);
                    }} className='admin-form-holder'>
                        <div className='admin-modal-body'>
                            <div className='add-movie-form' id="addMovieForm">
                                <div className='admin-movie-form-col'>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Title</label>
                                        <input type='text' className='add-movie-input' onChange={(e) => setTitle(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Release Date</label>
                                        <input type='date' className='add-movie-input' onChange={(e) => setReleaseDate(e.target.value)}></input>
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
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Category</label>
                                        <select className='add-movie-input' onChange={(e) => setStateID(e.target.value)}>
                                            <option value={"1"}>Archived</option>
                                            <option value={"2"}>Now Playing</option>
                                            <option value={"3"}>Trending</option>
                                            <option value={"4"}>Coming Soon</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                                    <button className='admin-movie-button' type='submit'>
                                                Add Movie
                                    </button>
                        </div>
                    </form>
                </div>
        </div>
    );
}