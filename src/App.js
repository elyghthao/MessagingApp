// import logo from './logo.svg';
// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion';
// import { urlFor, client } from './client';
import { useSelector } from 'react-redux';

import { Main, Navbar, TextEntry } from './Components';

import React from 'react';



const App = () => {


  return (
      <div className="bg-stone-200
      h-screen
      w-screen">
        <Navbar />
        <Main />
        <TextEntry />
      </div>

  );
}

export default App;
