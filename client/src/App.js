import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import NavBar from './components/NavBar'
import Home from './pages/Home'
import BoatPage from './pages/BoatPage'
import BoatForm from './components/BoatForm'
import Login from './pages/Login'
import Signup from './pages/Signup'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
        <div>
          <NavBar />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/boat'
              element={<BoatPage />}
            />
            <Route path='/boatform' element={<BoatForm />}></Route>
            {/* <Route
              path='/login'
              element={<Login />}
            /> */}
            {/* <Route
              path='/signup'
              element={<Signup />}
            /> */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
