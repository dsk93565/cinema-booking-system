import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';


const MovieCard = ({movie}) => {
    const moviePosterImage = movie.poster_path;

    // Poster Flip
    const [isFlipped, setIsFlipped] = useState(false);
    const handlePosterFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Movie Trailer
    const [showTrailer, setShowTrailer] = useState(false);
    const [youtubeKey, setYoutubeKey] = useState('');
    const handleTrailer = async (event) => {
        event.stopPropagation();

        try {
            const response = await axios.get(`http://localhost:8000/api/get-movies/${movie.id}/`);
            const youtubeVideo = response.data.results.find(video => video.site === 'YouTube');
            if (youtubeVideo) {
                setYoutubeKey(youtubeVideo.key);
                setShowTrailer(true);
            } // if
        } catch (error) {
            console.error('Failed to fetch trailer: ', error);
        } // try catch
    };

    return (
        <div className='movie-card'>
            <div className='movie-poster-container'>
                <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
                    <div>
                        <img onClick={handlePosterFlip} src={moviePosterImage} alt={movie.title} className='movie-poster' />
                    </div>

                    <div className='movie-poster-back'>
                        <img onClick={handlePosterFlip} src={moviePosterImage} alt={movie.title} className='movie-poster' />
                        <button onClick={handleTrailer} className='CTA-button-one'>Watch trailer</button>
                        <button className='CTA-button-one'>Movie info</button>
                        <button className='CTA-button-one'>Book tickets</button>
                    </div>
                </ReactCardFlip>
            </div>
            <h3 onClick={handlePosterFlip} className='movie-title'>{movie.title}</h3>
            <div className='movie-brief-info'>2 HR 7 MIN • PG13</div>

            {/* Movie Trailer Modal */}
            {showTrailer && (
                <div onClick={(e) => e.stopPropagation()} className='movie-trailer-container'> {/* Prevents event propagation */}
                    <div onClick={() => setShowTrailer(false)} className='close'>X</div>
                    <iframe src={`https://www.youtube.com/embed/${youtubeKey}`} title='YouTube video player' height='315' width='560' allowFullScreen></iframe>
                </div>
            )}
        </div>
    )
}

export default MovieCard;