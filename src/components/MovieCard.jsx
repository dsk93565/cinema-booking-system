import { React, useState } from 'react';
import { createPortal } from 'react-dom';
import TrailerLoader from './TrailerLoader';
import ReactCardFlip from 'react-card-flip';


const MovieCard = ({movie, origin}) => {
    const moviePosterImage = movie.poster_path;
        
    // Card Styling
    const cardStyle = {
        height: `${origin === "MoviesCard" ? 20 : 10}rem`,
        width: `${origin === "MoviesCard" ? 13 : 6.5}rem`,
        rowGap: `${origin === "MoviesCard" ? 1 : 0.1}rem`
    };

    // Poster Flip
    const [isFlipped, setIsFlipped] = useState(false);
    const handlePosterFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Movie Trailer
    const [showTrailer, setShowTrailer] = useState(false);
    /* const [youtubeKey, setYoutubeKey] = useState(''); */
    const handleTrailer = async (event) => {
        /* event.stopPropagation(); */
        setShowTrailer(true);

        /* try {
            const response = await axios.get(`http://localhost:8000/api/get-movies/`);
            const thisMovie = response.data.movies.filter( (m) => m.mid == this.movie.mid );
            thisTrailerLoader.render();
        } catch (error) {
            console.error('Failed to fetch trailer: ', error);
        } // try catch */
    };

    /* // Modal Styling
    const modalStyle = {
        height: `${origin === "MoviesCard" ? 20 : 10}rem`,
        width: `${origin === "MoviesCard" ? 13 : 6.5}rem`,
        rowGap: `${origin === "MoviesCard" ? 1 : 0.1}rem`
    }; */

    return (
        <div className='movie-card'>
            <div className='movie-poster-container' style={cardStyle}>
                <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
                    <div>
                        <img style={cardStyle} onClick={handlePosterFlip} src={moviePosterImage} alt={movie.title} className='movie-poster' />
                    </div>

                    <div className='movie-poster-back' style={cardStyle}>
                        <img onClick={handlePosterFlip} style={cardStyle} src={moviePosterImage} alt={movie.title} className='movie-poster' />
                        <button onClick={handleTrailer} className='CTA-button-one'>Watch trailer</button>
                        <button className='CTA-button-one'>Movie info</button>
                        <button className='CTA-button-one'>Book tickets</button>
                    </div>
                </ReactCardFlip>
            </div>
            

            {/* Movie Trailer Modal */}
            { showTrailer && createPortal(
                <TrailerLoader movie={movie}
                                onClose={() => setShowTrailer(false)}
                                onClick={(e) => e.stopPropagation()}
                                className='movie-trailer-container'
                                id='trailer-root' />, document.body
            )}
        </div>
    )
}

export default MovieCard;