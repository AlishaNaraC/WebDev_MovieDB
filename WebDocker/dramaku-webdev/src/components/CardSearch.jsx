import { useNavigate } from 'react-router-dom';

function CardSearch({ id, imgSrc, title, releaseDate, genres, rating, views, country }) {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="card-search">
            <div className="card-search-content">
                <img src={imgSrc} onClick={() => handleCardClick(id)} alt={title} />
                <div className="card-search-info">
                    <h3>{title}</h3>
                    <p>{releaseDate}</p>
                    <p>{genres}</p>
                    <p>{country}</p> 
                    <p>Rate {rating ? rating : "0.0"}/5</p>
                </div>
            </div>
        </div>
    );
};

export default CardSearch;
