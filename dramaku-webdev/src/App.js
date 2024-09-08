import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './script.js';
import Home from './Home';
import SearchPage from './SearchPage';
import DetailPage from './DetailPage';
import Login from './Login';
import Register from './Register';
import InputDramas from './InputDramas.jsx';
import Actors from './Actors';
import Comments from './Comments';
import Awards from './Awards';
import Genres from './Genres';
import Countries from './Countries';
import VaildateDramas from './ValidateDramas';
import Users from './Users';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SearchResultPage" element={<SearchPage />} />
        <Route path="/DetailPage" element={<DetailPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/InputDramas" element={<InputDramas />} />
        <Route path="/Actors" element={<Actors />} />
        <Route path="/Comments" element={<Comments />} />
        <Route path="/Awards" element={<Awards />} />
        <Route path="/Genres" element={<Genres />} />
        <Route path="/Countries" element={<Countries />} />
        <Route path="/ValidateDramas" element={<VaildateDramas />} />
        <Route path="/Users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
