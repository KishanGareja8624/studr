"use client"
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  onSearchClick: () => void;
}

function SearchBar({ onSearchClick }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputClick = () => {
    onSearchClick();
  };

  return (
    <div className="flex items-center space-x-2 bg-hihlightsidebar rounded-md h-7 p-2 w-5/12">
      <button onClick={handleInputClick} className="focus:outline-none">
        <MagnifyingGlassIcon className="h-4 w-5 text-graytext" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={handleInputClick}
        className="flex-grow bg-hihlightsidebar text-graytext placeholder-graytext focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
