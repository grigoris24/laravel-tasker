import {React, useEffect, useState} from 'react';
import '../css/header.css';

function Header() {
    return (
        <div className="Header">
            <div id="title">
                <div id="tasker-title">Tasker by Grigoris Papadopoulos</div>
                <div id="menu">button</div>
            </div>
        </div>
    );
}

export default Header;