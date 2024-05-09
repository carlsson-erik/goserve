import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HomeScreen } from "./screens/HomeScreen";
import Navbar from "./components/Navbar";

const client = new ApolloClient({
  uri: "http://localhost:8081/query",
  cache: new InMemoryCache(),
});

export const FetchContext = React.createContext(client);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="h-full">
          <Navbar />
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
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
