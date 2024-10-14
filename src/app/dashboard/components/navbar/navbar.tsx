"use client"; 

import React from "react";
import SearchBar from "../../components/navbar/searchbar/searchbar";

function Navbar() {
  const handleSearchClick = () => {
    console.log("Search clicked");
  };

  return (
    <div className="flex sticky h-8 flex-row items-center justify-center">
      <SearchBar onSearchClick={handleSearchClick} />
    </div>
  );
}

export default Navbar;
