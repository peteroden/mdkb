import React from "react";
import { Link } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";
import { Search } from "./Search";

export const Header = () => {
  return (
    <header>
      <nav>
        <img src="/logo192.png" alt="Great Items" height="90" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Search />
          </li>
		  <li><Link to="/item">+</Link></li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
