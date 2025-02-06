import React, { useState } from 'react';
import '../css/header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNewTask = () => {
        navigate("/create-task");
        setMenuOpen(false);
    };

    const home = () => {
        navigate("/");
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="Header">
            <div id="title">
                <div id="tasker-title">Tasker by Grigoris Papadopoulos</div>

                <div id="desktop" style={{ gap: '5px' }}>
                    <button onClick={home} id="create_task">Home</button>
                    <button onClick={handleNewTask} id="create_task">Create Task</button>
                </div>

                <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`overlay ${menuOpen ? "active" : ""}`} onClick={toggleMenu}></div>

                <div id="side-menu" className={menuOpen ? "active" : ""}>
                    <div id="buttons">
                    <button onClick={home}>Home</button>
                    <button onClick={handleNewTask}>Create Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
