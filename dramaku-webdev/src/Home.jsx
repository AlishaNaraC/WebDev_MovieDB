import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Card from './components/Card';

function Home() {
  return (
    <div>
      <Header />
      <main className="main">
        <Card />
      </main>
    </div>
  );
}

export default Home;
