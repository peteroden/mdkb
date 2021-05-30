import React, { useState, FormEventHandler } from "react";
import { Link, useHistory } from "react-router-dom";
import { SearchBox } from '@fluentui/react';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSearch = (searchQuery: string) => {
    history.push({ pathname: "/search", search: `?search=${searchQuery}` });    
  }

  return (
    <div>
      <SearchBox placeholder="Search" onSearch={searchQuery => handleSearch(searchQuery)} />
    </div>
  );
};
