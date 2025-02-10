import React, { useEffect, useState } from 'react';
import '../css/tasks.css';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(window.innerWidth <= 600 ? 5 : 10);

    useEffect(() => {
        const handleResize = () => {
            setPerPage(window.innerWidth <= 600 ? 5 : 10);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetch(`/api/tasks?page=${currentPage}&perPage=${perPage}`)
            .then(response => response.json())
            .then(data => {
                setTasks(data.data);
                setLastPage(data.last_page);
                setIsLoaded(true);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, [currentPage, perPage]);

    const handleTaskClick = (taskId) => {
        setSelectedTaskId((prev) => (prev === taskId ? null : taskId));
    };

    return (
        <div id="task-list">
            <ul>
                {tasks.map((task, index) => (
                    <li
                        key={task.id}
                        className={`task item ${isLoaded ? 'move-up' : ''} ${selectedTaskId === task.id ? 'expanded' : ''}`}
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            backgroundColor: task.color || '',  
                            color: task.text_color || 'black',
                        }}
                        onClick={() => handleTaskClick(task.id)}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                            <h2>{task.name}</h2>
                            <img
                                className={`arrow ${selectedTaskId === task.id ? 'rotate' : ''}`}
                                src="/svg/arrow.svg"
                                alt="arrow"
                                style={{ width: "25px", height: "25px" }}
                            />
                        </div>

                        {selectedTaskId === task.id && (
                            <div className="task-description">
                                <p style={{color: task.text_color || 'black'}}>{task.description}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {lastPage > 1 && (
                <div className="pagination">
                    {currentPage > 1 && (
                        <button id="previous" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                            <span>Previous</span>
                            <img src="/svg/arrow.svg" alt="arrow" />
                        </button>
                    )}

                    <span>Page {currentPage} of {lastPage}</span>

                    {currentPage < lastPage && (
                        <button id="next" onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}>
                            <img src="/svg/arrow.svg" alt="arrow" />
                            <span>Next</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Tasks;
