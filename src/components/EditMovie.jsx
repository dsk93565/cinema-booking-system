import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'
import axios from 'axios';

export default function EditMovie({ onClose, movieid }) {
    
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

    // Filled Form Checker For Basic Information Section
    const isEditMovieFormFilled = (!title || 
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

    console.log("filled: ", isEditMovieFormFilled);
    const user_token = localStorage.getItem('userToken');
    const mid = movieid;

    const getMovie = async() => {
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
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const movieData = {
            user_token,
            mid,
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
                console.log(response);
            }).catch(function(error) {
                console.log("Error adding movie: ", error.message);
            });
        }

        postMovie(movieData);
        onClose();
    }

    return (
        <div className='modal-wrapper'>
                <div className='admin-modal'>
                    <div className='modal-header'>
                        <div className='modal-title'><h1>Edit Movie</h1></div>
                        <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
                    </div>
                    <form className='admin-form-holder' onSubmit={(event) => handleSubmit(event)}>
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
                                        <select className='add-movie-input' value={msid} onChange={(e) => setStateID(e.target.value)}>
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
                            <button disabled={isEditMovieFormFilled} className='admin-movie-button' type='submit'>Save Movie</button>
                        </div>
                    </form>
                </div>
        </div>
    );
}