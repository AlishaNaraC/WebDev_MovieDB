import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Card from './components/Card';
// import Pagination from 'react-bootstrap/Pagination';

function Home() {
  return (
    <div>
      <Header />
      <main className="main">
        <Card />
      </main>
        {/* <Pagination className="d-flex justify-content-center align-items-center mt-3">
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination> */}
    </div>
  );
}

export default Home;
