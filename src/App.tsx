import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '@/components/Layout';
import HomePage from '@/components/Homepage';
import SignUpForm from '@/components/SignUpForm';
import BookingForm from '@/components/BookingForm';

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
            <BookingForm />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <section className="citrus-bg min-h-screen flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-md text-center">
              <h1 className="text-3xl font-bold text-yellow-700 mb-4">About Little Lemon</h1>
              <p className="text-gray-800 text-lg">
                Little Lemon is a family-owned Mediterranean restaurant located in the heart of the city. We pride ourselves on serving authentic dishes made with fresh, locally sourced ingredients.
              </p>
              </div>
            </section>
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