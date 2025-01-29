import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Header from '../Components/Header';
import Tasks from '../Components/Tasks';


function App() {
    return (
        <div>
        <Header />
        <Tasks />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));