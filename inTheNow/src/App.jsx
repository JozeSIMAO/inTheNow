import React from 'react'
import NavBar from './NavBar';
import { useState } from 'react';
import NewsBoard from './NewsBoard';
import Weather from './Weather';
import SignIn from './authentication/SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import './App.css';
import { auth } from './authentication/FirebaseConfig';

function App() {
  const [url, setUrl] = useState(`https://newsapi.org/v2/top-headlines?sortBy=relevency&pageSize=8&language=en&apiKey=${import.meta.env.VITE_API_KEY}`);

  return (
    <div className='App'>
      <Router>
        <NavBar setUrl={setUrl} auth={auth}/>
        <Routes>
          <Route exact path='/' element={<NewsBoard url={url}/>} />
          <Route path='/DisplayWeather' element={<Weather />} />
          <Route path='/SignIn' element={<SignIn />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App
