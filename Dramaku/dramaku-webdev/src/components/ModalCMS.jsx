import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function ModalCMS({show, onHide, drama, onStatusUpdate}) {
    const [dramaDetails, setDramaDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (drama?.id) {
            fetchDramaDetails();
        }
    }, [drama?.id]);

    const fetchDramaDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/dramas/${drama.id}/details`);
            setDramaDetails(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching drama details:', err);
            setError('Failed to load drama details');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/dramas/${drama.id}/status`, {
                status: 'Approved'
            });
            alert('Success approving drama!');
            onStatusUpdate(drama.id, 'Approved');
            onHide();
        } catch (err) {
            console.error('Error approving drama:', err);
            alert('Failed to approve drama');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                        <h5 className="modal-title">{dramaDetails?.title}</h5>
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
                                        src={dramaDetails?.poster || "image/movie.jpg"}
                                        className="img-fluid movie-image"
                                        alt={dramaDetails?.title}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="p-3">
                                        <h3>{dramaDetails?.title}</h3>
                                        <p><strong>Alternative Title:</strong> {dramaDetails?.alt_title}</p>
                                        <p><strong>Release Date:</strong> {dramaDetails?.release_d}</p>
                                        <p><strong>Synopsis:</strong> {dramaDetails?.synopsis}</p>
                                        <p><strong>Genres:</strong> {dramaDetails?.genres}</p>
                                        <p><strong>Availability:</strong> {dramaDetails?.availability}</p>
                                        <p><strong>Status:</strong> {dramaDetails?.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Actor Cards */}
                        <h4 className="mb-3" style={{ textAlign: 'center' }}>Cast</h4>
                        <div className="actor-card-container-modal">
                            {dramaDetails?.actors?.map((actor, index) => (
                                <div className="actor-card-modal" key={index}>
                                    <img 
                                        src={actor.actor_poster || "image/imageactress.jpeg"} 
                                        alt={actor.actor_name} 
                                    />
                                    <div className="actor-card-content">
                                        <h3>{actor.actor_name}</h3>
                                        <p>Birth Date: {actor.birth_date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Video Container */}
                        {dramaDetails?.trailer && (
                            <div className="detail-video-container mt-4">
                                <h4 className="mb-3">Trailer</h4>
                                <iframe
                                    width="480"
                                    height="270"
                                    src={dramaDetails.trailer}
                                    title={`${dramaDetails.title} Trailer`}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleApprove}
                            disabled={dramaDetails?.status === 'Approved'}
                        >
                            {dramaDetails?.status === 'Approved' ? 'Already Approved' : 'Approve'}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={onHide}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCMS;