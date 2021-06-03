import React from "react";
import { Link } from "react-router-dom";
import { Item } from "../types/Item";

export const SearchResultItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div>
      <Link to={`/item/${item.id}`}>Id: {item.id} - Title: {item.title}</Link>
    </div>
  );
};
