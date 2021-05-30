import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchResultItem } from "../components/SearchResultItem";
import { Item } from "@api/types/Item";
import { search } from "../types/CrudsApi";

export const SearchNavigator = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const getSearchResults = async () => {
        const results = await search(searchParams.get("search") || "*")
        setSearchResults(results);
    }

    getSearchResults();
  }, [location]);

  return (
    <div>
      <hr />
      {searchResults.map((item: Item) => (
        <SearchResultItem key={item.id} item={item} />
      ))}
    </div>
  );
};
