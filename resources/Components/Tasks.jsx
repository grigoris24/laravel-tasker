import React, { useEffect, useState } from 'react';
import '../css/tasks.css';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

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

    return (
        <div id="task-list">
            
            <ul>
                {tasks.map((task, index) => (
                    <li 
                        key={task.id}
                        className={`task item ${isLoaded ? 'move-up' : ''}`} 
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <h2>{task.name}</h2>
                        <p>{task.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tasks;
