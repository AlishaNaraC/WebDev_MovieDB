import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
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
import Profile from './Profile';
import NotFound from './NotFound';
import Wishlist from './Wishlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
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
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;