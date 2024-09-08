import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

const Genres = () => {
    return (
        <div>
            <nav className="navbar navbar-light" style={{ backgroundColor: 'darkblue' }}>
                <div className="container-fluid">
                    <a className="navbar-dramaku" href="WebDev_MovieDB/home.html">DramaKu</a>
                    {/* <form className="d-flex mx-auto" style={{ width: '300px' }}>
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-light" type="submit">Search</button>
                    </form> */}
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <nav id="list-item" className="navbar navbar-light p-3" style={{ backgroundColor: 'transparent' }}>
                            <nav className="nav nav-pills flex-column">
                                <a className="nav-link custom-link" href="#" data-bs-toggle="collapse" data-bs-target="#submenu1">Dramas</a>
                                <div className="collapse" id="submenu1">
                                <nav className="nav nav-pills flex-column">
                                    <a className="nav-link ms-3 my-1 custom-link" href="ValidateDramas">Validate</a>
                                    <a className="nav-link ms-3 my-1 custom-link" href="InputDramas">Input New Drama</a>
                                </nav>
                                </div>
                                <a className="nav-link custom-link" href="Countries">Countries</a>
                                <a className="nav-link custom-link" href="Awards">Awards</a>
                                <a className="nav-link custom-link" href="Genres">Genres</a>
                                <a className="nav-link custom-link" href="Actors">Actors</a>
                                <a className="nav-link custom-link" href="Comments">Comments</a>
                                <a className="nav-link custom-link" href="Users">Users</a>
                                <a className="nav-link custom-link" data-bs-toggle="collapse" href="#" data-bs-target="#submenu2">Account</a>
                                <div className="collapse" id="submenu2">
                                <nav className="nav nav-pills flex-column">
                                    <a className="nav-link ms-3 my-1 custom-link" href="Profile">Profile</a>
                                    <a className="nav-link ms-3 my-1 custom-link" href="/">Logout</a>
                                    </nav>
                                </div>
                            </nav>
                        </nav>
                    </div>
                    <div className="col-md-8 column-content">
                        <div>
                            <h1>Genres</h1>
                        </div>
                        <div id="table-container" className="content-section">
                            <div id="forms-input">
                                <form className="d-flex align-items-center mx-auto" style={{ padding: '10px' }}>
                                    <label htmlFor="input-data-forms" className="form-label me-2">Genres</label>
                                    <input className="form-control me-2" id="input-data-forms" type="text" aria-label="Genres" />
                                    <button className="btn btn-light" type="submit">Submit</button>
                                </form>
                            </div>
                            <div className="search-genre-container">
                                <input type="text" placeholder="Search Genre" />
                                <i className='bx bx-search'></i>
                                {/* <i className='bx bx-search' onClick={() => window.location.href='searchResultPage.html'}></i> */}
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Genres</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-light">
                                        <th scope="row">1</th>
                                        <td>Comedy</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
                                        </td>
                                    </tr>
                                    <tr className="table-light">
                                        <th scope="row">2</th>
                                        <td>Thriller</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
                                        </td>
                                    </tr>
                                    <tr className="table-light">
                                        <th scope="row">3</th>
                                        <td>Drama</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPenToSquare} className="custom-link2" /> | <FontAwesomeIcon icon={faTrashCan} className="custom-link2" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="genres-page">
                            <ul className="pagination justify-content-end">
                                <li className="page-item">
                                    <a className="page-link" href="#">Previous</a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">1</a>
                                </li>
                                <li className="page-item" aria-current="page">
                                    <a className="page-link" href="#">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">3</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Genres;
