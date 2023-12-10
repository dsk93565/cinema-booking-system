import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'
import axios from 'axios';
import DateTime from 'react-datetime';
import MoviesDropdown from './MoviesDropdown';

export default function AddShowing({ onClose, movies }) {
    
    // Variables for submission
    const [mid, setMid] = useState('');
    const [pid, setPid] = useState('');
    const [rid, setRid] = useState('');

    // Variables for form display
    const [playingMovies, setPlayingMovies] = useState([])
    const [shows, setShows] = useState([]);

    const user_token = localStorage.getItem('userToken');
    
    const handleSubmit = () => {
        /* const showInfoExport = {
            
        }
        console.log(JSON.stringify(showInfoExport)); */

        async function postShowing () {
            await axios.post('http://localhost:8000/api/admin/add-showing', {
                user_token: user_token,
                mid: mid,
                pid: pid,
                rid: rid
            }).then(function (response) {
                if (response.status === 403)
                    console.log("Not Authorized");
                console.log(response);
            }).catch(function(error) {
                console.log("Error adding movie: ", error.message);
            });
        }

        postShowing();
        onClose();
    }


    const fetchShowings = async(mid) => {
        await axios.post('http://localhost:8000/api/get-shows', {
            mid: mid
        }).then(function (response) {
            if (response.status === 403)
                console.log("Not Authorized");
            setShows(response.data.showings);
        }).catch(function(error) {
            console.log("Error getting shows: ", error.message);
        });
    }

    // Fetches currently playing movies to be scheduled.
    const fetchPlayingMovies = () => {
        try {
            async function getMovies() {
                return axios.get(`http://localhost:8000/api/get-movies`)
                .then(function (response) {
                    setPlayingMovies(response.data["Now Playing"]);
                })
            }
            getMovies();
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchPlayingMovies();
    }, [])

    useEffect(() => {
        if(mid)
            fetchShowings(mid);
    }, [mid])

    useEffect(() => {
        if(playingMovies[0]) {
            setMid(playingMovies[0].mid)
            setPid(1);
            setRid(1);
        }
    }, [playingMovies])
    
    return (
        <div className='modal-wrapper'>
                <div className='admin-modal'>
                    <div className='modal-header'>
                        <div className='modal-title'><h1>Add Showing</h1></div>
                        <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
                    </div>
                    <div className='admin-modal-body'>
                        <form className='add-movie-form' onSubmit={handleSubmit}>
                            <div className='admin-movie-form-body'>
                                <div className='admin-movie-form-col'>
                                    <div className='movie-info'>
                                            <label className='movie-info-label'>Show Date</label>
                                            <input type='date' className='add-movie-input'></input>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Select Time</label>
                                        <select className='add-movie-input' value={1} onChange={(e) => setPid(e.target.value)}>
                                            <option value={1}>Period 1: 9:00 AM - 12:00 PM</option>
                                            <option value={2}>Period 2: 12:00 PM - 3:00 PM</option>
                                            <option value={3}>Period 3: 3:00 PM - 6:00 PM</option>
                                            <option value={4}>Period 4: 6:00 PM - 9:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='admin-movie-form-col'>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Select Movie</label>
                                        <select className='add-movie-input' onChange={(e) => setMid(e.target.value)}>
                                            {playingMovies.map(movie => (
                                                <option value={movie.mid} key={movie.mid}>{movie.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='movie-info'>
                                        <label className='movie-info-label'>Select Room</label>
                                        <select className='add-movie-input' onChange={(e) => setRid(e.target.value)}>
                                            <option value={1}>Room 1</option>
                                            <option value={2}>Room 2</option>
                                            <option value={3}>Room 3</option>
                                            <option value={4}>Room 4</option>
                                            <option value={5}>Room 5</option>
                                            <option value={6}>Room 6</option>
                                            <option value={7}>Room 7</option>
                                            <option value={8}>Room 8</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <div className='show-listing-holder'>
                                    {shows[0] && (shows.map(show => (
                                        <div key={show.shid} className='show-listing'>
                                            <div className='show-listing-info'>Date: {show.show_date}</div>
                                            <div className='show-listing-info'>Room: {show.room_id}</div>
                                            <div className='show-listing-info'>Period: {show.period_id}</div>                                            
                                        </div>
                                    )))}
                                </div>
                                <button disabled={!mid || !pid || !rid} className='admin-movie-button' type='submit'>Add Showing</button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    );
}