import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Header from '../Components/Header';
import Tasks from '../Components/Tasks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Create from '../Components/Create';
    

function App() {
    return (
        <Router>
            <div>
            <Header />
            <Routes>
                <Route path="/" element={<Tasks />} />
                <Route path="/create-task" element={<Create />} />
            </Routes>
             </div>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));