import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Hero from "./Components/Hero";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("best sellers");

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        handleSearch={(term) => {
          setSearchQuery(term);
        }}
      />
      <Banner />
      <Hero searchQuery={searchQuery} />
    </div>
  );
};

export default App;
