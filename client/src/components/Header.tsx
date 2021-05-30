import React from "react";
import { Link, useHistory } from "react-router-dom";
import { IconButton, Layer, Text } from '@fluentui/react';
import { Search } from "./Search";

// import { MsalProvider } from "@azure/msal-react";
// import { Configuration,  PublicClientApplication } from "@azure/msal-browser";

export const Header = () => {
  const history = useHistory();
  const handleOnClick = (target: string) => {
    history.push('/');
  }

  return (
    <header>
      <div>
        <Text>MarkDown KnowledgeBase</Text>
        <IconButton iconProps={{ iconName: 'Home' }} title="Home" ariaLabel="Home" onClick={() => handleOnClick('/')} />
        <div style={{ float: "right" }}>
          <Search />
          <Text>Login</Text>            
        </div>
      </div>
    </header>
  );
};
