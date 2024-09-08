import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './script.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Comments() {
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
                  <h1>Comments</h1>
                </div>
                <div id="table-container" className="content-section">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="dropdown">
                        <label htmlFor="dropdownapprove-filter" className="btn-label me-2">Filtered by:</label>
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownapprove-filter" data-bs-toggle="dropdown" aria-expanded="false">
                          None
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownapprove-filter">
                          <li><a className="dropdown-item" href="#">Approved</a></li>
                          <li><a className="dropdown-item" href="#">Unapproved</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="dropdown">
                        <label htmlFor="dropdownshows" className="btn-label me-2">Shows:</label>
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownshows" data-bs-toggle="dropdown" aria-expanded="false">
                          10
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownshows">
                          <li><a className="dropdown-item" href="#">25</a></li>
                          <li><a className="dropdown-item" href="#">50</a></li>
                          <li><a className="dropdown-item" href="#">100</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-2 search-drama-container">
                      <input type="text" placeholder="Search Drama" />
                      <i className='bx bx-search'></i>
                      {/* <button onClick={() => window.location.href='searchResultPage.html'}>Search</button> */}
                    </div>
                  </div>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Username</th>
                        <th scope="col">Rate</th>
                        <th scope="col" className="med-column">Drama</th>
                        <th scope="col" className="long-column">Comments</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody id="formApprove">
                      <tr className="table-light">
                        <th scope="row"><input type="checkbox" name="check" value="Value 1" /></th>
                        <td>SeriesStreamer</td>
                        <td>4 Star</td>
                        <td>Young Sheldon</td>
                        <td>Never get bored, even it has alot of episodes, which more than one hundred, i watched all of them</td>
                        <td>Unapproved</td>
                      </tr>
                      <tr className="table-light">
                        <th scope="row"><input type="checkbox" name="check" value="Value 2" /></th>
                        <td>asdfghjkl</td>
                        <td>4 Star</td>
                        <td>Dark</td>
                        <td>Confused but entertaining</td>
                        <td>Unapproved</td>
                      </tr>
                      <tr className="table-light">
                        <th scope="row"><input type="checkbox" name="check" value="Value 3" /></th>
                        <td>qwerty</td>
                        <td>5 Star</td>
                        <td>Sherlock Holmes</td>
                        <td>Finally, a good mystery Movie</td>
                        <td>Approved</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-md-4 act-comment">
                    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                      <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          Select
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                          {/* <li><a className="dropdown-item" href="#" onClick={() => selectAllComment()}>All</a></li>
                          <li><a className="dropdown-item" href="#" onClick={() => selectUnappComment()}>Unapproved</a></li>
                          <li><a className="dropdown-item" href="#" onClick={() => selectAppComment()}>Approved</a></li>
                          <li><a className="dropdown-item" href="#" onClick={() => selectNoneComment()}>None</a></li> */}
                        </ul>
                      </div>
                      <button type="button" className="btn btn-primary">Approve</button>
                      <button type="button" className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <nav aria-label="comments-page">
                      <ul className="pagination justify-content-end">
                        <li className="page-item">
                          <a className="page-link" href="#">Previous</a>
                        </li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item">
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
          </div>
        </div>
    );
}

export default Comments;