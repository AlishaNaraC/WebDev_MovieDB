import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import CardDetail from './components/CardDetail';
import Actor from './components/Actor';


function DetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
          try {
            const response = await fetch(`http://localhost:5000/movie/${id}`);
            const jsonData = await response.json();
            setMovie(jsonData);
          } catch (err) {
            console.error(err.message);
          }
        };
    
        getMovieDetails();
      }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <main className="main">
                <CardDetail
                    imgSrc={movie.poster}
                    title={movie.title}
                    alttitle={movie.alt_title}
                    releaseDate={movie.release_d}
                    synopsis={movie.synopsis}
                    genres={movie.genres}
                    rating={movie.rating}
                    views={movie.tviews}
                    avail={movie.avail}
                />
                <Actor actors={movie.actors} />
                <div className="container mb-3">
                    <div className="detail-video-container">
                        <iframe
                            width="100%" // Changed width to 100% for responsiveness
                            height="605"
                            src={movie.trailer}
                            title="Drama Trailer"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                <div className="container review-container texts-info">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <h3>(4) People think about this drama</h3>
                        </div>
                        <div className="col-md-6">
                            <label>Filtered by:</label>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                        </div>
                    </div>

                    {[
                    { name: 'Nara', date: '4/4/2014', comment: 'It is a wonderful drama! I Love it so much!!!' }
                    ].map((review, index) => (
                    <div key={index} className="review-card mb-3">
                        <p>{`${review.name} (${review.date}) said : ${review.comment}`}</p>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                    </div>
                    ))}

                    <div className="add-review mt-4">
                    <h3>Add Your Review!</h3>
                    <p>Name: <input type="text" className="review-input" /></p>
                    <p>Rate: 
                        <i className="bx bx-star review-star"></i>
                        <i className="bx bx-star review-star"></i>
                        <i className="bx bx-star review-star"></i>
                        <i className="bx bx-star review-star"></i>
                    </p>
                    <p>Your Thoughts: <textarea className="review-textarea"></textarea></p>
                    <label>You can only submit your review once.</label>
                        <div className="submit-review mt-3">
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DetailPage;