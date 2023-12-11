import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'
import axios from 'axios';

export default function AddMovie({ onClose }) {
    
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
    const [msid, setStateID] = useState('2');
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                                  !poster_path ||
                                  !msid);
        
    const userToken = localStorage.getItem('userToken');
    console.log(readyToSubmit);
    /* console.log(title);
    console.log(release_date);
    console.log(category);
    console.log(cast);
    console.log(director);
    console.log(producer);
    console.log(synopsis);
    console.log(reviews);
    console.log(trailer);
    console.log(rating);
    console.log(poster_path); */

    /* useEffect(() => {
        if (!isFormEmpty) {
            console.log("Is form empty:", isFormEmpty);
            setReadyToSubmit(true);
        } else
            setReadyToSubmit(false);
        console.log("Is ready to submit:", readyToSubmit);
        
    }, [isFormEmpty, readyToSubmit]) */

    function handleSubmit () {        
        if(!isFormEmpty) {

            const movieData =  {
                userToken,
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
            };
            
            console.log(JSON.stringify(movieData));
            
            async function postMovie (movieInfoExport) {
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
            }

            postMovie(movieData);
        }
    }

    useEffect(() => {
        if(readyToSubmit) {
            handleSubmit();
            setReadyToSubmit(false);
            onClose();
        }
    }, [readyToSubmit])

    const activateSubmit = (event) => {
        event.preventDefault();
        setReadyToSubmit(true);
    }

    return (
        <div className='modal-wrapper'>
                <div className='admin-modal'>
                    <div className='modal-header'>
                        <div className='modal-title'><h1>Add Movie</h1></div>
                        <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
                    </div>
                    <form onSubmit={(e) => activateSubmit(e)} className='admin-form-holder'>
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
                                        {/** Defaults to Now Playing */}
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
                                    <button className='admin-movie-button' type='submit'>
                                                Add Movie
                                    </button>
                        </div>
                    </form>
                </div>
        </div>
    );
}