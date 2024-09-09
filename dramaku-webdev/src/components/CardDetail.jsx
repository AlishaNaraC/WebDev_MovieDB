import movieOne from '../image/movieOne.jpg';

function CardDetail(){
    return (
        <div className="card-right-container">
            <div className="card-right">
                <div className="card-right-content">
                        <img src={movieOne} className="img-fluid movie-image" alt="Euphoria" />
                        <div className="card-right-info">
                            <h3>Title of the drama 1 that makes two lines</h3>
                            <p>Other Titles</p>
                            <p>2024</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Genre 1, Genre 2, Genre 3</p>
                            <p>Rate 3.5/5 19 views</p>
                            <p>Netflix, Disney Hotstar, Amazon Prime, HBO</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail;