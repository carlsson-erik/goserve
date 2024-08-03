import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HomeScreen } from "./screens/HomeScreen";
import Navbar from "./components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;
const url = API_URL ? API_URL : `${window.location.protocol}`;
console.log(import.meta.env.VITE_APP_TITLE, API_URL);
console.log(url);
const client = new ApolloClient({
  uri: url + "/query",
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
        <div id="modal-root" />
        <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-100">
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
