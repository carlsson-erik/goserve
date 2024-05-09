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
        <div className="h-screen w-screen flex flex-col bg-gray-500 text-gray-100">
          <Navbar />
          <Routes>
            <Route path="/*" element={<HomeScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
