import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import CardDetail from './components/CardDetail';
import Actor from './components/Actor';
import StarRating from './components/StarRating';
import { jwtDecode } from 'jwt-decode';
import {Button, Modal} from 'react-bootstrap/Button';
import {FaStar} from "react-icons/fa";


function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(null);
    const [username, setUser] = useState(null);
    const [reviewError, setReviewError] = useState("");
    const [reviews, setReviews] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() =>{
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token){
            try {
                const decodedToken = jwtDecode(token.split('=')[1]);
                console.log("Decoded Token:", decodedToken);
                setUser(decodedToken.username);
                setIsLoggedin(true);
            } catch (error) {
                console.error("Invalid token:", error);
                setIsLoggedin(false);
            }
        }else{
            setIsLoggedin(false);
        }
    },[]);

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

    const onSubmitReview = async (e) => {
        e.preventDefault();

        if (!rating) {
            alert("Please provide a rating before submitting.");
            return;
        }
        if (!comment.trim()) {
            alert("Please write a comment before submitting.");
            return;
        }

        try {
            const body = {username, id, rating, comment};
            const response = await fetch(`http://localhost:5000/reviews`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            if (response.ok) {
                const newReview = { user_id: username, drama_id: id, rate: rating, comment, created_at: new Date().toISOString() };
                setComment("");
                setRating(null);
                setReviewError("");
                setSubmitSuccess(true);
            } else {
                setComment("");
                setRating(null);
                const errorData = await response.json();
                setReviewError(errorData.error || "Failed to submit review");
            }
        } catch (err) {
            console.error(err.message);
            setReviewError("An error occurred while submitting your review.");
        }
    }

    const handleClose = () => setSubmitSuccess(false);

    useEffect(() => {
        const getReviews = async () => {
          try {
            const response = await fetch(`http://localhost:5000/reviews/${id}`);
            const jsonData = await response.json();
            setReviews(jsonData);
          } catch (err) {
            console.error(err.message);
          }
        };
        getReviews();
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
                            width="100%"
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
                            <h4>({reviews.length}) People think about this drama</h4>
                        </div>
                        {/* <div className="col-md-6">
                            <label>Filtered by:</label>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                            <i className="bx bx-star"></i>
                        </div> */}
                    </div>

                    {reviews.map((review, index) => (
                        <div key={index} className="review-card mb-3">
                            <p><strong>{review.username}</strong>{" "}
                                    <FaStar 
                                        className="starRate" 
                                        size={15}
                                        color={"#ffb121"}
                                        style={{ marginLeft: "10px", marginBottom:"5px" }}
                                    />
                                    {" "}<span>{review.rate} / 5</span> {/* Displaying the rating here */}
                            </p>
                            <p>{review.comment}</p>
                            <p style={{ color: "#9c9c9c" }}>({new Date(review.created_at).toLocaleDateString()})</p>
                        </div>
                    ))}
                    
                    {isLoggedin ? (
                        <form className="add-review mt-4" onSubmit={onSubmitReview}>
                            <h4>Add Your Review!</h4>
                            {/* <p>Name: <input type="text" className="review-input" /></p> */}
                            {reviewError && <div className="alert alert-danger">{reviewError}</div>}
                            <div className='mb-3'>Rate:<StarRating rating={rating} setRating={setRating}/></div>
                            <p>Your Thoughts: 
                                <textarea 
                                    className="review-textarea" 
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    required
                                />
                            </p>
                            <label>You can only submit your review once.</label>
                            <div className="submit-review mt-3">
                                <Button type="submit" variant='secondary'>Submit</Button>
                            </div>
                        </form>
                    ) : (
                        <p>
                            <Button variant="secondary" onClick={() => navigate('/login')}>Login
                            </Button>{' '}
                            to Submit a Review. 
                        </p>
                    )}
                </div>
            </main>
            <Modal show={submitSuccess} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                    <Modal.Body>Your submit was completed successfully! 
                        Your review will be visible after admin approval.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DetailPage;