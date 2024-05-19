import React from 'react'
import NavBar from './NavBar';
import { useState } from 'react';
import NewsBoard from './NewsBoard';

function App() {

  const [category, setCategory] = useState('general');

  return (
    <>
      <NavBar  setCategory={setCategory}/>
      <NewsBoard  category={category}/>
    </>
  )
}

export default App
