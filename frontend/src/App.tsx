import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HomeScreen } from "./screens/HomeScreen";
import Navbar from "./components/Navbar";

const API_URL = import.meta.env.VITE_API_URL || "localhost";
const API_PORT = import.meta.env.VITE_API_PORT || 8081;
console.log(import.meta.env.VITE_APP_TITLE);
const client = new ApolloClient({
  uri: `http://${API_URL}:${API_PORT}/query`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
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
