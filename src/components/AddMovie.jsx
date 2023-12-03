import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylings/admin.css'

export default function AddMovie({ onClose }) {

    return (
        <div className='modal-wrapper'>
                <div className='modal'>
                    <div className='modal-header'>
                        <div className='modal-title'><h1>Add Movie</h1></div>
                        <span className='close'><FontAwesomeIcon onClick={onClose} icon='fa fa-window-close'/></span>
                    </div>
                        
                    <div className='modal-footer'>
                        
                    </div>
                </div>
        </div>
    );
}