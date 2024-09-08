import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import movieOne from './image/movieOne.jpg';
import actorOneImg from './image/actorOneImg.jpeg';
import actorTwoImg from './image/actorTwoImg.jpg';
import actorThreeImg from './image/actorThreeImg.jpg';
import actorFourImg from './image/actorFourImg.jpg';
import actorFiveImg from './image/actorFiveImg.jpg';
import actorSixImg from './image/actorSixImg.jpg';

const DetailPage = () => {
    const handleSearch = () => {
        window.location.href = 'searchResultPage';
    };

    return (
        <div>
        <header className="header">
            <div className="search-container">
            <input type="text" placeholder="Search Dramas" />
            <i onClick={handleSearch} className= "bx bx-search"></i>
            </div>
        </header>

        <Sidebar />
        <MainContent />
        </div>
    );
};

const Sidebar = () => {
    return (
      <section className="sidebar">
        <header>
          <a href="/" style={{ textDecoration: 'none' }}>DramaKu</a>
        </header>
      </section>
    );
};

const MainContent = () => {
  return (
    <main className="main">
        <div className="container mb-3">
            <div className="row g-0">
                <div className="col-md-6">
                    <img src={movieOne} className="img-fluid movie-image" alt="Euphoria" />
                </div>
                <div className="col-md-6"> {/* Changed from col-md-5 to col-md-6 */}
                    <div className="p-3 texts-info">
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

        <div className="container">
            <div className="actor-card-container row">
                {[
                    { src: actorOneImg, name: 'Actor 1', role: 'Role 1' },
                    { src: actorTwoImg, name: 'Actor 2', role: 'Role 2' },
                    { src: actorThreeImg, name: 'Actor 3', role: 'Role 3' },
                    { src: actorFourImg, name: 'Actor 4', role: 'Role 4' },
                    { src: actorFiveImg, name: 'Actor 5', role: 'Role 5' },
                    { src: actorSixImg, name: 'Actor 6', role: 'Role 6' }
                ].map((actor, index) => (
                    <div key={index} className="col-md-2">
                        <div className="actor-card">
                            <img src={actor.src} alt={actor.name} className="img-fluid" />
                            <div className="actor-card-content">
                                <h3>{actor.name}</h3>
                                <p>{actor.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

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