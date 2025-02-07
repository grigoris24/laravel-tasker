import React from "react";
import "../css/create.css"

function Create() {

    return (
        <div id="task-create">
            <h3>Create task</h3>
            <form id="form">
                <label htmlFor="name">Task name:</label>
                <input  placeholder="Do my chores..." name="name"></input>
                <label htmlFor="description">Description:</label>
                <textarea  placeholder="I have to do..." name="description"></textarea>
            </form> 
        </div>
    );
}

export default Create;