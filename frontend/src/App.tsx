import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HomeScreen } from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import tailwindConfig from "../tailwind.config";
import { Configuration, setup } from "twind";

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
const graphqlUrl = apiUrl ? `${apiUrl.replace(/\/$/, "")}/query` : "/query";

const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

setup(tailwindConfig as unknown as Configuration);

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
