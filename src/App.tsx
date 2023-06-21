import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import NotFound from './components/notFound';
import WithAuth from './components/withAuth';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>loading...</p>}>
        <Routes>
            <Route path="/" element={
              <WithAuth>
                <Dashboard />
              </WithAuth>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
