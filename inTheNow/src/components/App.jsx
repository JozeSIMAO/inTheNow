import React from 'react'
import NavBar from './NavBar';
import { useState } from 'react';
import NewsBoard from './NewsBoard';
import Weather from './Weather';
import weather_bg from '../assets/weather_bg.jpg';
import image from '../assets/signin_bg.jpg';
import SignIn from '../authentication/SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import './App.css';
import { auth } from '../authentication/FirebaseConfig';
import PreloadImages from './PreloadImages';
import Login from '../authentication/Login';

function App() {
  const [url, setUrl] = useState(`https://newsapi.org/v2/top-headlines?sortBy=relevency&pageSize=8&language=en&apiKey=${import.meta.env.VITE_API_KEY}`);
  const imagesToPreload = [weather_bg, image];

  return (
    <div className='App'>
      <Router>
        <PreloadImages images={imagesToPreload} />
        <NavBar setUrl={setUrl} auth={auth} />
        <Routes>
          <Route exact path='/' element={<NewsBoard url={url}/>} />
          <Route path='/DisplayWeather' element={<Weather />} />
          <Route path='/SignIn' element={<SignIn />}/>
          <Route path='/Login' element={<Login />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App
