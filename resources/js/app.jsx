import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/app.css';

function App() {
    return <h1 className='text-primary'>Project is working!</h1>
}

createRoot(document.getElementById('app')).render(<App />)