import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MovieInfo({movie, onClose}) {
  
    return (
      <div className='modal-wrapper'>
        <div className='modal'>
            <div className='modal-header'>
                <div className='modal-title'><h1>{movie.title}</h1></div>
                <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
            </div>
            <div className='modal-body'>
              <div className='modal-body-image'>
                <img src={movie.poster_path} className='modal-body-image'/>
              </div>
              <div className='modal-body-text'>
                  <p><strong>Genre:</strong> {movie.category}</p>
                  <p><strong>Cast:</strong> {movie.cast}</p>
                  <p><strong>Director:</strong> {movie.director}</p>
                  <p><strong>Producer:</strong> {movie.producer}</p>
                  <p><strong>Summary:</strong> {movie.synopsis}</p>
              </div>
            </div>

            <div className='modal-footer'>
            </div>
        </div>
      </div>
  );
}