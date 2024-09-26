import React from 'react';
import '../index.css';

function ModalCMS({show, onHide}){
    return(
        <div
            className={`modal fade ${show ? 'show d-block' : ''}`}
            id="validateModal"
            tabIndex="-1"
            aria-labelledby="ModalDrama"
            aria-hidden={!show}
            role="dialog"
            style={{ display: show ? 'block' : 'none' }}
            >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div className="modal-content" id="modalContent">
                <div className="modal-header">
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={onHide}
                    ></button>
                </div>
                <div className="modal-body">
                    <div className="container mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img
                            src="image/movie.jpg"
                            className="img-fluid movie-image"
                            alt="Euphoria"
                        ></img>
                        </div>
                        <div className="col-md-8">
                        <div className="p-3">
                            <h3>Title of the drama 1 that makes two lines</h3>
                            <p>Other Titles</p>
                            <p>2024</p>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>Genre 1, Genre 2, Genre 3</p>
                            <p>Rate 3.5/5 19 views</p>
                            <p>Availability</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Actor Cards */}
                    <div className="actor-card-container">
                    {/* Repeat actor cards as needed */}
                    <div className="actor-card">
                        <img src="image/imageactress.jpeg" alt="Actor"></img>
                        <div className="actor-card-content">
                        <h3>Actor 1</h3>
                        <p>Role 1</p>
                        </div>
                    </div>
                    <div className="actor-card">
                        <img src="image/imageactress.jpeg" alt="Actor"></img>
                        <div className="actor-card-content">
                        <h3>Actor 1</h3>
                        <p>Role 1</p>
                        </div>
                    </div>
                    <div className="actor-card">
                        <img src="image/imageactress.jpeg" alt="Actor"></img>
                        <div className="actor-card-content">
                        <h3>Actor 1</h3>
                        <p>Role 1</p>
                        </div>
                    </div>
                    <div className="actor-card">
                        <img src="image/imageactress.jpeg" alt="Actor"></img>
                        <div className="actor-card-content">
                        <h3>Actor 1</h3>
                        <p>Role 1</p>
                        </div>
                    </div>
                    <div className="actor-card">
                        <img src="image/imageactress.jpeg" alt="Actor"></img>
                        <div className="actor-card-content">
                        <h3>Actor 1</h3>
                        <p>Role 1</p>
                        </div>
                    </div>
                    <div className="actor-card">
                        <img src="image/imageactress.jpeg" alt="Actor"></img>
                        <div className="actor-card-content">
                        <h3>Actor 1</h3>
                        <p>Role 1</p>
                        </div>
                    </div>
                    </div>
                    {/* Video Container */}
                    <div className="detail-video-container">
                    <iframe
                        width="480"
                        height="270"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY"
                        title="Sample Video"
                    ></iframe>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onHide}
                    >
                    Approve
                    </button>
                    <button type="button" className="btn btn-danger">
                    Delete
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}
export default ModalCMS;