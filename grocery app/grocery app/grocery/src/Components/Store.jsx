import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Products from './Products';

const Store = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Track search query

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Pass state to Navbar */}
      <Products searchQuery={searchQuery} /> {/* Pass state to Products */}
      <Footer />
    </div>
  );
}

export default Store;