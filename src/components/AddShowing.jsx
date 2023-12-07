import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'
import axios from 'axios';
import DateTime from 'react-datetime';
import MoviesDropdown from './MoviesDropdown';

export default function AddShowing({ onClose, movies }) {
    
    // Variables for submission
    const [movie, setMovie] = useState('');
    const [period, setPeriod] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');

    // Variables for form display
    const [playingMovies, setPlayingMovies] = useState([])

    const userToken = localStorage.getItem('userToken');
    
    const handleSubmit = async() => {

        const showInfoExport = {
            movie,
            period,
            room,
            date
        }

        console.log(JSON.stringify(showInfoExport));

        await axios.post('http://localhost:8000/api/admin/add-showing', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(showInfoExport),
        }).then(function (response) {
            if (response.status === 403)
                console.log("Not Authorized");
            console.log(response);
        }).catch(function(error) {
            console.log("Error adding movie: ", error.message);
        });
          
        onClose();
    }

    const fetchShowings = async(mid) => {
        await axios.get('http://localhost:8000/api/get-shows', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mid),
        }).then(function (response) {
            if (response.status === 403)
                console.log("Not Authorized");
            console.log(response);
        }).catch(function(error) {
            console.log("Error adding movie: ", error.message);
        });
    }

    // Fetches currently playing movies to be scheduled.
    const fetchPlayingMovies = async () => {
        let response;
        
        try {
            response = await axios.get(`http://localhost:8000/api/get-movies`);
            const { data } = response;
            const filteredMovies = data.movies.filter(movie => movie.state_id === "2");
            console.log(filteredMovies);
            setPlayingMovies(filteredMovies);


        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchPlayingMovies();
    }, [])

    return (
        <div className='modal-wrapper'>
                <div className='admin-modal'>
                    <div className='modal-header'>
                        <div className='modal-title'><h1>Add Showing</h1></div>
                        <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
                    </div>
                    <div className='admin-modal-body'>
                        <form className='add-movie-form' id="addMovieForm">
                            <div className='admin-movie-form-col'>
                                <DateTime />
                            </div>
                            <div className='admin-movie-form-col'>
                                <MoviesDropdown movies={movies}/>                               
                            </div>
                            
                        </form>
                    </div>
                    <div className='modal-footer'>
                        <button className='admin-movie-button' type='submit' onClick={handleSubmit}>Add Showing</button>
                    </div>
                </div>
        </div>
    );
}