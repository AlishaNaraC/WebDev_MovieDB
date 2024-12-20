import React from 'react';
import '../index.css';

function CardDetail({ imgSrc, title, releaseDate, genres, rating, alttitle, synopsis, avail }){
    return (
        <div className="card-right-container">
            <div className="card-right">
                <div className="card-right-content">
                        <img src={imgSrc} className="img-fluid movie-image" alt={title} />
                        <div className="card-right-info">
                            <h3><b>{title}</b></h3>
                            <p className='detail-text'>{alttitle || "N/A"}</p>
                            <p className='detail-text'>{releaseDate}</p>
                            <p className='detail-text'>{synopsis}</p>
                            <p className='detail-text'>{genres}</p>
                            <p className='detail-text'> Rate {rating ? rating : "0.0"}/5</p>
                            <p className='detail-text'>{avail}</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail;