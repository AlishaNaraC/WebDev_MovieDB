import React from 'react';
import '../index.css';

function CardDetail({ imgSrc, title, releaseDate, genres, rating, views, alttitle, synopsis, avail }){
    return (
        <div className="card-right-container">
            <div className="card-right">
                <div className="card-right-content">
                        <img src={imgSrc} className="img-fluid movie-image" alt={title} />
                        <div className="card-right-info">
                            <h3>{title}</h3>
                            <p>{alttitle || "N/A"}</p>
                            <p>{releaseDate}</p>
                            <p>{synopsis}</p>
                            <p>{genres}</p>
                            <p>Rate {rating}/5 {views} views</p>
                            <p>{avail}</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail;