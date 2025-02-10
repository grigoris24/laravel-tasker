import React, { useState, useEffect } from "react";
import "../css/create.css";

function Create() {
    const [formData, setFormData] = useState({ name: "", description: "", color: "#D8DFE5", text_color: "#000000" });
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
                setFormData({ name: "", description: "", color: "#D8DFE5", text_color: "#000000" });
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
        <div id="task-create-body">
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
                        id="textarea"
                        placeholder="I have to do..."
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
                        <label htmlFor="color">Task color:</label>
                        <input
                            id="color"
                            name="color"
                            type="color"
                            value={formData.color}
                            onChange={handleChange}
                        />
                        <label htmlFor="text_color">Text color:</label>
                        <input
                            id="text_color"
                            name="text_color"
                            type="color"
                            value={formData.text_color}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button id="submit" type="submit">
                        <span>Create task</span>
                        <img src="/svg/plus.svg" alt="arrow" />
                    </button>
                </form>

                <h4>Preview:</h4>
                <div 
                    style={{
                        backgroundColor: formData.color, 
                        color: formData.text_color, 
                        padding: "10px", 
                        marginTop: "20px",
                        borderRadius: "20px"
                    }}
                >
                    <p><strong>{formData.name || "Task name"}</strong></p>
                    <p>{formData.description || "Task description"}</p>
                </div>

                {message && <p style={{display: 'flex', justifyContent: 'center'}}>{message}</p>}
            </div>
        </div>
    );
}

export default Create;
