function CardSearch({ imgSrc, title, releaseDate, genres, rating, views }) {
    const handleCardClick = () => {
        window.location.href = 'detailPage';
      };

    return (
        <div className="card-search">
            <div className="card-search-content">
                <img src={imgSrc} onClick={handleCardClick} alt={title} />
                <div className="card-search-info">
                    <h3>{title}</h3>
                    <p>{releaseDate}</p>
                    <p>{genres}</p>
                    <p>Rate {rating}/5 | {views} views</p>
                </div>
            </div>
        </div>
    );
};

export default CardSearch;