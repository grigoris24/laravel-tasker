import {React, useEffect, useState} from 'react';
import '../css/header.css';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();
    const handleNewTask = () => {
        navigate("/create-task");
    };
    const home = () => {
        navigate("/");
    }

    const openBurger = () => {
        document.querySelector(".hamburger").classList.toggle("active");
    }


    return (
        <div className="Header">
            <div id="title">
                <div id="tasker-title">Tasker by Grigoris Papadopoulos</div>
                    <div id="desktop" style={{ gap: '5px'}}>
                        <button onClick={home}id="create_task">Home</button>
                        <button onClick={handleNewTask}id="create_task">Create Task</button>
                    </div>
                    <div className="hamburger" onClick={openBurger}>
                        <span></span>
                        <span></span>
                    </div>
            </div>
        </div>
    );
}

export default Header;