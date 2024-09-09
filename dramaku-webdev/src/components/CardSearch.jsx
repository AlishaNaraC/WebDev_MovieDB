function CardSearch({ imgSrc }) {
    const handleCardClick = () => {
        window.location.href = 'detailPage';
      };

    const increment = () => {
        let i = 0;
        i++;
        return i;
    }

    return (
        <div className="card-search">
            <div className="card-search-content">
                <img src={imgSrc} onClick={handleCardClick} alt="movie" />
                <div className="card-search-info">
                    <h3>Title of the drama {increment()} that makes two lines</h3>
                    <p>2024</p>
                    <p>Genre 1, Genre 2, Genre 3</p>
                    <p>Rate 3.5/5 19 views</p>
                </div>
            </div>
        </div>
    );
};

export default CardSearch;