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
  const [query, setQuery] = useState('');

  return (
    <>
      <Router>
        <NavBar setCategory={setCategory} setQuery={setQuery}/>
        <Routes>
          <Route exact path='/' element={<NewsBoard category={category} query={query} />} />
          <Route path='/DisplayWeather' element={<Weather />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
