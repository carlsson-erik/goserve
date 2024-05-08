import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HomeScreen } from "./screens/HomeScreen";

const client = new ApolloClient({
  uri: "http://localhost:8081/query",
  cache: new InMemoryCache(),
});

export const FetchContext = React.createContext(client);

const App = () => {
  return (
    <FetchContext.Provider value={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <div className="h-screen w-screen bg-gray-800 text-gray-100">
                <HomeScreen />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </FetchContext.Provider>
  );
};

export default App;
