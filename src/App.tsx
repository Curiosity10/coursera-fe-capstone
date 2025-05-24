import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './components/Homepage';
import SignUpForm from './components/SignUpForm';
import ReservationForm from './components/ReservationForm';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/signup" element={
          <Layout showHeader={false}>
            <SignUpForm />
          </Layout>
        } />
        <Route path="/reservations" element={
          <Layout showHeader={false}>
            <ReservationForm />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-4xl font-bold">About Little Lemon</h1>
              <p className="mt-4 text-lg">
                Little Lemon is a family-owned Mediterranean restaurant located in the heart of the city. We pride ourselves on serving authentic dishes made with fresh, locally sourced ingredients.
              </p>
            </div>
          </Layout>
        } />
        <Route path="*" element={
          <Layout>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <a href="/" className="text-blue-600 hover:text-blue-800 underline">
                  Return to Home
                </a>
              </div>
            </div>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;