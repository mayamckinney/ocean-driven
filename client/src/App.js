import React from "react";
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Flex } from "@chakra-ui/react"
import './App.css';

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BoatPage from "./pages/BoatPage";
import BoatForm from "./components/BoatForm";
import BoatEdit from "./pages/BoatEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Success from "./pages/Success";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Flex flexDirection='column' flexGrow='1' justifyContent='space-between' minHeight='100vh'>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/boat" element={<BoatPage />} />
            <Route path="/boatform" element={<BoatForm />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/boat-edit" element={<BoatEdit />}></Route>
            <Route path="/success" element={<Success />}></Route>
          </Routes>
          <Footer />
        </Flex>
      </Router>
    </ApolloProvider>
  );
}

export default App;
