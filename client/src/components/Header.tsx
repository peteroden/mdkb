import React from "react";
import { useHistory } from "react-router-dom";
import { IconButton, Text, Stack, IStackStyles} from '@fluentui/react';
import { Search } from "./Search";

// import { MsalProvider } from "@azure/msal-react";
// import { Configuration,  PublicClientApplication } from "@azure/msal-browser";

export const Header = () => {
  const history = useHistory();
  const handleOnClick = (target: string) => {
    history.push('/');
  }

  const stackStyles: IStackStyles = {
    root: {
      overflow: 'hidden',
      width: '100%',
    }
  }

  return (
    <header>
      <div>
        <Stack horizontal styles={stackStyles} horizontalAlign="space-between">
          <Stack horizontal>
          <Stack.Item align="start" >
            <Text>MarkDown KnowledgeBase</Text>
          </Stack.Item>
          <Stack.Item>
            <IconButton iconProps={{ iconName: 'Home' }} title="Home" ariaLabel="Home" onClick={() => handleOnClick('/')} />
          </Stack.Item>
          </Stack>
          <Stack.Item align="end">
            <Search />
          </Stack.Item>
          <Stack.Item>
            <Text>Login</Text>
          </Stack.Item>
        </Stack>
        <div style={{ float: "right" }}>
        </div>
      </div>
    </header>
  );
};
