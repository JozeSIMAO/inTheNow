import React from 'react'
import NavBar from './NavBar';
import { useState } from 'react';
import NewsBoard from './NewsBoard';
import Weather from './Weather';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

function App() {
  const [category, setCategory] = useState('general');
  const [query, setQuery] = useState('Africa');
  const [url, setUrl] = useState(`https://newsapi.org/v2/everything?q=${query}&sortBy=relevency&language=en&apiKey=${import.meta.env.VITE_API_KEY}`);

  return (
    <>
      <Router>
        <NavBar setCategory={setCategory} setQuery={setQuery} category={category} setUrl={setUrl}/>
        <Routes>
          <Route exact path='/' element={<NewsBoard category={category} query={query} url={url}/>} />
          <Route path='/DisplayWeather' element={<Weather />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
