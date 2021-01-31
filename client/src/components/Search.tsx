import React, { useState, FormEventHandler } from "react";
import { Link, useHistory } from "react-router-dom";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    history.push({ pathname: "/search", search: `?search=${searchQuery}` });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input onChange={handleInput} type="textbox" width="10"></input>
        <Link to={{ pathname: "/search", search: `?search=${searchQuery}` }}>
          🧐
        </Link>
      </form>
    </div>
  );
};
