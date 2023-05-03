/** @format */

import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { useAppDispatch } from './redux/store';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/auth/selectors';
import { fetchAuthMe } from './redux/auth/asyncActions';
import React from 'react';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchAuthMe());
    }
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
