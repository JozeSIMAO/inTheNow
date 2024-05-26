import React from 'react'
import NavBar from './NavBar';
import { useState } from 'react';
import NewsBoard from './NewsBoard';
import Weather from './Weather';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

function App() {
  const [url, setUrl] = useState(`https://newsapi.org/v2/top-headlines?sortBy=relevency&language=en&apiKey=${import.meta.env.VITE_API_KEY}`);

  return (
    <>
      <Router>
        <NavBar setUrl={setUrl}/>
        <Routes>
          <Route exact path='/' element={<NewsBoard url={url}/>} />
          <Route path='/DisplayWeather' element={<Weather />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
