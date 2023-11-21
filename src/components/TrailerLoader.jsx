import React from 'react';

export default function TrailerLoader({ onClose, movie }) {
    // Finding Video ID
    function getYouTubeVideoId(url) {
        // Regular expression to match YouTube URLs and extract the video ID
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|watch\?feature=player_embedded&v=|embed\/videoseries\?list=|user\/\S+\/\S+|v=))([^?&"'>]+)/;
      
        const match = url.match(regex);
        console.log(match[1]);
        if (match && match[1]) {
          return match[1];
        } else {
          return null; // Video ID not found
        }
    }

    return (
        <div className='movie-trailer-container'>
                <div onClick={onClose} className='close'>X</div>
                <iframe src={`https://www.youtube.com/embed/${getYouTubeVideoId(movie.trailer)}`} title='YouTube video player' height='315' width='560' allowFullScreen></iframe>
        </div>
    );
}