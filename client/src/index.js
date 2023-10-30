import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from './pages/Search';
import Story from './pages/Story';
import Error from './pages/Error';
import './styles/index.css';
import './styles/app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='container'>
        <Router>
            <Routes>
                <Route path='/' element={<Search />} />
                <Route path='/story/:id' element={<Story />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    </div>
);