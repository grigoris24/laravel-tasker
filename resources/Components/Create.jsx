import React, { useState, useEffect } from "react";
import "../css/create.css";

function Create() {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("Task created successfully!");
                setFormData({ name: "", description: "" });
            } else {
                setMessage("Failed to create task.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred.");
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div id="task-create">
            <h3>Create task</h3>
            <form id="form" onSubmit={handleSubmit}>
                <label htmlFor="name">Task name:</label>
                <input
                    placeholder="Do my chores..."
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    placeholder="I have to do..."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <button id="submit" type="submit">
                    <span>Create task</span>
                    <img src="/svg/plus.svg" alt="arrow" />
                </button>
            </form>
            {message && <p style={{display: 'flex', justifyContent: 'center'}}>{message}</p>}
        </div>
    );
}

export default Create;
