import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import HeaderCMS from './components/HeaderCMS';
import actorOneImg from './image/actorOneImg.jpeg';
import actorTwoImg from './image/actorTwoImg.jpg';
import actorThreeImg from './image/actorThreeImg.jpg';
import actorFourImg from './image/actorFourImg.jpg';
import actorFiveImg from './image/actorFiveImg.jpg';
import actorSixImg from './image/actorSixImg.jpg';
import actorSevenImg from './image/actorSevenImg.jpg';
import actorEightImg from './image/actorEightImg.jpg';
import actorNineImg from './image/actorNineImg.jpg';
import { Container, Row, Col, Button } from "react-bootstrap";

const DramaInput = () => {
    return (
        <Container>
          <Row>
            <Col>
              <HeaderCMS/>
            </Col>
          </Row>
          <Row>
            <Col className='viewport-cms'>
              <div className="column-content">
                  <h1>Input New Drama</h1>
              </div>
              <div className="col-md-8 column-content">
                <div className="input-container">
                  <div className="input-content">
                    <div className="input-content-input">
                      <p>Title</p>
                      <input type="text" id="title" name="title" required />
                    </div>
                    <div className="input-content-input">
                      <p>Alternative Title</p>
                      <input type="text" id="altTitle" name="altTitle" />
                    </div>
                  </div>
    
                  <div className="input-content-2">
                    <div className="dropdown">
                      <div className="select">
                        <span className="selected">Year</span>
                        <div className="caret"></div>
                      </div>
                      <ul className="dropdown-menu">
                        <li>2021</li>
                        <li>2020</li>
                        <li>2019</li>
                        <li>2018</li>
                        <li>2017</li>
                      </ul>
                    </div>
                    <div className="input-content-input">
                      <p>Country</p>
                      <input type="text" id="country" name="country" required />
                    </div>
                  </div>
    
                  <div className="input-content">
                    <div className="input-content-input">
                      <p>Synopsis</p>
                      <textarea id="synopsis" name="synopsis" required />
                    </div>
                  </div>
                  <div className="input-content">
                    <div className="input-content-input">
                      <p>Availability</p>
                      <input type="text" id="availability" name="availability" required />
                    </div>
                  </div>
                  <div className="input-content-genre">
                    <p>Add Genre</p>
                    <ul>
                      <li>
                        <input type="checkbox" id="genre1" name="genre1" value="Action" />
                        <label htmlFor="genre1">Action</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre2" name="genre2" value="Adventures" />
                        <label htmlFor="genre2">Adventures</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre3" name="genre3" value="Romance" />
                        <label htmlFor="genre3">Romance</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre4" name="genre4" value="Drama" />
                        <label htmlFor="genre4">Drama</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre5" name="genre5" value="SliceofLife" />
                        <label htmlFor="genre5">Slice Of Life</label>
                      </li>
                    </ul>

                    <ul>
                      <li>
                        <input type="checkbox" id="genre1" name="genre1" value="Action" />
                        <label htmlFor="genre1">Action</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre2" name="genre2" value="Adventures" />
                        <label htmlFor="genre2">Adventures</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre3" name="genre3" value="Romance" />
                        <label htmlFor="genre3">Romance</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre4" name="genre4" value="Drama" />
                        <label htmlFor="genre4">Drama</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre5" name="genre5" value="SliceofLife" />
                        <label htmlFor="genre5">Slice Of Life</label>
                      </li>
                    </ul>

                    <ul>
                      <li>
                        <input type="checkbox" id="genre1" name="genre1" value="Action" />
                        <label htmlFor="genre1">Action</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre2" name="genre2" value="Adventures" />
                        <label htmlFor="genre2">Adventures</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre3" name="genre3" value="Romance" />
                        <label htmlFor="genre3">Romance</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre4" name="genre4" value="Drama" />
                        <label htmlFor="genre4">Drama</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre5" name="genre5" value="SliceofLife" />
                        <label htmlFor="genre5">Slice Of Life</label>
                      </li>
                    </ul>

                    <ul>
                      <li>
                        <input type="checkbox" id="genre1" name="genre1" value="Action" />
                        <label htmlFor="genre1">Action</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre2" name="genre2" value="Adventures" />
                        <label htmlFor="genre2">Adventures</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre3" name="genre3" value="Romance" />
                        <label htmlFor="genre3">Romance</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre4" name="genre4" value="Drama" />
                        <label htmlFor="genre4">Drama</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre5" name="genre5" value="SliceofLife" />
                        <label htmlFor="genre5">Slice Of Life</label>
                      </li>
                    </ul>

                    <ul>
                      <li>
                        <input type="checkbox" id="genre1" name="genre1" value="Action" />
                        <label htmlFor="genre1">Action</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre2" name="genre2" value="Adventures" />
                        <label htmlFor="genre2">Adventures</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre3" name="genre3" value="Romance" />
                        <label htmlFor="genre3">Romance</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre4" name="genre4" value="Drama" />
                        <label htmlFor="genre4">Drama</label>
                      </li>
                      <li>
                        <input type="checkbox" id="genre5" name="genre5" value="SliceofLife" />
                        <label htmlFor="genre5">Slice Of Life</label>
                      </li>
                    </ul>
                  </div>
    
                  <div className="input-content">
                    <div className="input-actor">
                      <p>Add Actors (Up to 9)</p>
                      <input type="text2" placeholder="Search Actor Names" />
                      <i className="bx bx-search"></i>
    
                      <div className="input-actor-card-container">
                        <div className="input-actor-card">
                          <img src= {actorOneImg} alt="actor 1" />
                          <p>actor 1</p>
                        </div>
                        <div className="input-actor-card">
                          <img src={actorTwoImg} alt="actor 2" />
                          <p>actor 2</p>
                        </div>
                        <div className="input-actor-card">
                          <img src={actorThreeImg} alt="actor 3" />
                          <p>actor 3</p>
                        </div>
                        <div className="input-actor-card">
                          <img src={actorFourImg} alt="actor 4" />
                          <p>actor 4</p>
                        </div>
                        <div className="input-actor-card">
                          <img src={actorFiveImg} alt="actor 5" />
                          <p>actor 5</p>
                        </div>
                        <div className="input-actor-card">
                          <img src={actorSixImg} alt="actor 6" />
                          <p>actor 6</p>
                        </div>
                        <div className="input-actor-card">
                          <img src={actorSevenImg} alt="actor 7" />
                          <p>actor 7</p>
                        </div>
                        <div className="input-actor-card">
                          <img src={actorEightImg} alt="actor 8" />
                          <p>actor 8</p>
                        </div>
                        <div className="input-actor-card">
                          <img src={actorNineImg} alt="actor 9" />
                          <p>actor 9</p>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div className="input-content">
                    <div className="input-content-input">
                      <p>Link Trailer</p>
                      <input type="text" id="trailer" name="trailer" required />
                    </div>
                    <div className="input-content-input">
                      <p>Award</p>
                      <input type="text" id="award" name="award" required />
                    </div>
                  </div>
    
                  <div className="user-buttons">
                    <Button variant='secondary' type='submit'>Submit</Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    };

export default DramaInput;
