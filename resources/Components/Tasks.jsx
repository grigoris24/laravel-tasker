import React, { useEffect, useState } from 'react';
import '../css/tasks.css';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        fetch('/api/tasks')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTasks(data);
                setIsLoaded(true);
            })
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

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
                        style={{ animationDelay: `${index * 0.1}s` }}
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
                                <p>{task.description}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tasks;
