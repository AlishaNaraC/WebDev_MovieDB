import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';

import Header from './components/Header';
import CardDetail from './components/CardDetail';
import Actor from './components/Actor';


function DetailPage() {
    return (
        <div>
            <Header />
            <main className="main">
                <MainContent />
            </main>
        </div>
    );
};

const MainContent = () => {
  return (
    <main className="main">
        <CardDetail />
        <Actor />
        <div className="container mb-3">
            <div className="detail-video-container">
                <iframe
                    width="100%" // Changed width to 100% for responsiveness
                    height="605"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY"
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
  );
};

export default DetailPage;