import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import {Button, Modal} from 'react-bootstrap';

function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      const decodedToken = jwtDecode(token.split('=')[1]);
      setUserId(decodedToken.user_id);
    }
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/wishlist/${userId}`, {
          headers: {
            'Authorization': `Bearer ${document.cookie.split('token=')[1]}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setWishlist(data);
        } else {
          console.error('Failed to fetch wishlist');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  const handleDelete = async (wishlistId) => {
    try {
      const response = await fetch(`http://localhost:5000/wishlist/${wishlistId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${document.cookie.split('token=')[1]}`
        }
      });

      if (response.ok) {
        setWishlist(wishlist.filter(item => item.wishlist_id !== wishlistId));
        setDeleteSuccess(true);
      } else {
        console.error('Failed to delete wishlist item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => setDeleteSuccess(false);

  const handleCardClick = (dramaId) => {
    navigate(`/movie/${dramaId}`);
  };

  return (
    <>
        <Header/>
        <h1 style={{marginTop:'20px'}}>My Watchlist</h1>
        {wishlist.length > 0 ? (
            <ul className="wishlist-grid">
                {wishlist.map((item) => (
                    <div className="wishlist-container" key={item.wishlist_id}>
                        <div className="wishlist-item" onClick={() => handleCardClick(item.drama_id)}>
                            <img src={item.poster} alt={item.title} />
                            <div>
                                <h3>{item.title}</h3>
                                <p>Rate {item.rating ? item.rating : "0.0"}/5</p>
                            </div>
                        </div>
                        <div className="button-container">
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDelete(item.wishlist_id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        ) : (
            <p>No items in your wishlist.</p>
        )}
        <Modal show={deleteSuccess} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
                <Modal.Body>Your watch list was deleted successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default Wishlist;
