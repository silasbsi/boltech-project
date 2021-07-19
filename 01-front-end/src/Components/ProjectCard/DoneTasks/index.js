import React from 'react';

const DoneTasks = (props) => {
    const {task} = props;

    return (
        <>
            <input 
                type="checkbox" 
                id={task._id} 
                name={task._id} 
                value={task._id} 
                checked 
                disabled 
            />
            <label>{task.description}</label> 
        </>
    );
}

export default DoneTasks;