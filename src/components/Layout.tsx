import React from 'react';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">Little Lemon</h1>
            </header>
            <main className="flex-grow p-4">
                {/* Content will be injected here */}
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; {new Date().getFullYear()} Little Lemon. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;