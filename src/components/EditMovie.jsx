import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'
import axios from 'axios';

export default function EditMovie({ onClose, movie, handleEditMovieSubmit }) {
    
    const [title, setTitle] = useState(movie.title);
    const [release_date, setReleaseDate] = useState(movie.release_date);
    const [category, setCategory] = useState(movie.category);
    const [cast, setCast] = useState(movie.cast);
    const [director, setDirector] = useState(movie.director);
    const [producer, setProducer] = useState(movie.producer);
    const [synopsis, setSynopsis] = useState(movie.synopsis);
    const [reviews, setReviews] = useState(movie.reviews);
    const [trailer, setTrailer] = useState(movie.trailer);
    const [rating, setRating] = useState(movie.rating);
    const [poster_path, setPosterPath] = useState(movie.poster_path);
    const [msid, setStateID] = useState(movie.state_id);

    // Filled Form Checker For Basic Information Section
    const isEditMovieFormEmpty = (!title || 
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

    console.log("empty: ", isEditMovieFormEmpty);
    const user_token = localStorage.getItem('userToken');

    const movieData = {
        user_token,
        mid: movie.mid,
        release_date,
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
        msid,
    }

    /* const mid = movie.mid; */

    /* const getMovie = async() => {
        await axios.post('http://localhost:8000/api/get-movie', {
            mid: mid,
        }).then(function (response) {
            const movie = response.data.movies[0];
            console.log(movie);
            console.log(movie.release_date);
            setTitle(movie.title);
            setReleaseDate(movie.release_date);
            setCategory(movie.category);
            setCast(movie.cast);
            setDirector(movie.director);
            setProducer(movie.producer);
            setSynopsis(movie.synopsis);
            setReviews(movie.reviews);
            setTrailer(movie.trailer);
            setRating(movie.rating);
            setPosterPath(movie.poster_path);
            setStateID(movie.state_id);
        }).catch(function(error) {
            console.log("Error fetching movie: ", error.message);
        });
    }

    useEffect(() => {
        getMovie();
    }, []) */

    

    return (
        <div className='modal-wrapper'>
                <div className='admin-modal'>
                    <div className='modal-header'>
                        <div className='modal-title'><h1>Edit Movie</h1></div>
                        <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
                    </div>
                    <form className='admin-form-holder' onSubmit={(e) => {
                        e.preventDefault(); // Prevent the default form submission behavior
                        handleEditMovieSubmit(isEditMovieFormEmpty, movieData);
                    }}>
                        <div className='admin-modal-body'>
                            <div className='add-movie-form' id="EditMovieForm">
                                <div className='admin-movie-form-col'>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Title</label>
                                        <input type='text' value={title} className='add-movie-input' onChange={(e) => setTitle(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Release Date</label>
                                        <input type='date' value={release_date} className='add-movie-input' onChange={(e) => setReleaseDate(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Genre</label>
                                        <input type='text' value={category} className='add-movie-input' onChange={(e) => setCategory(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Cast</label>
                                        <input type='text' value={cast} className='add-movie-input' onChange={(e) => setCast(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Director</label>
                                        <input type='text' value={director} className='add-movie-input' onChange={(e) => setDirector(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Producer</label>
                                        <input type='text' value={producer} className='add-movie-input' onChange={(e) => setProducer(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className='admin-movie-form-col'>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Synopsis</label>
                                        <input type='text' value={synopsis} className='add-movie-input' onChange={(e) => setSynopsis(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Reviews</label>
                                        <input type='text' value={reviews} className='add-movie-input' onChange={(e) => setReviews(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Trailer</label>
                                        <input type='text' value={trailer} className='add-movie-input' onChange={(e) => setTrailer(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Rating</label>
                                        <input type='text' value={rating} className='add-movie-input' onChange={(e) => setRating(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Poster Image Path</label>
                                        <input type='text' value={poster_path} className='add-movie-input' onChange={(e) => setPosterPath(e.target.value)}></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Category</label>
                                        <select className='add-movie-input' defaultValue={msid} onChange={(e) => setStateID(e.target.value)}>
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
                            <button disabled={isEditMovieFormEmpty} className='admin-movie-button' type='submit'>Save Movie</button>
                        </div>
                    </form>
                </div>
        </div>
    );
}