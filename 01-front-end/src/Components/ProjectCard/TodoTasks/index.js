import React, { useState }from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { GoPencil } from 'react-icons/go';
import TaskService from '../../../services/taskService';
import { useToasts } from 'react-toast-notifications';

const TodoTasks = (props) => {
    const {projectId, task, handleTaskDelete, handleCheckboxClick} = props;
    
    const [changeTask, setChangeTask] = useState(false)
    const [taskDescription, setTaskDescription] = useState(task.description)

    const { addToast, removeAllToasts } = useToasts();

    const handleTaskOnBlur = (projectId, taskId) => {
        const payload = {
            projectId,
            taskId,
            description: taskDescription
        };

        const response = TaskService.update(payload);

        if (response?.error) {
            addToast(response?.error, { appearance: 'error' });
            setTimeout(() => removeAllToasts(), 3000);
        }

        setChangeTask(!changeTask)
    }

    const handleClick = (projectId, taskId) => {
        if (typeof handleCheckboxClick === 'function') {
            handleCheckboxClick(projectId, taskId)
        }
    }

    const handleDelete = (projectId, taskId) => {
        if (typeof handleTaskDelete === 'function') {
            handleTaskDelete(projectId, taskId)
        }
    }

    return (
        <>
            <input 
                className="list-item-checkbox"
                type="checkbox" 
                id={task._id} 
                name={task._id} 
                value={task._id} 
                onChange={() => handleClick(projectId, task._id)} 
            />
            {
                changeTask ? 
                (
                    <input 
                        className="project-card-task-input"
                        type="text"
                        onChange={e => setTaskDescription(e.target.value)}
                        value={taskDescription}
                        placeholder={taskDescription}
                        onBlur={() => handleTaskOnBlur(projectId, task._id)}
                        onent={() => handleTaskOnBlur(projectId, task._id)}
                        autoFocus={true}
                        spellCheck={false}
                        onKeyUp={(e) => e.keyCode === 13 ? handleTaskOnBlur(projectId, task._id) : null}
                    />
                )
                :
                (
                    <>
                        <label>{taskDescription}</label>
                        <GoPencil className="project-card-icons" onClick={() => setChangeTask(!changeTask)} />
                        <IoTrashOutline onClick={() => handleDelete(projectId, task._id)}/>
                    </>
                )
            }   
            
        </>
    );
}

export default TodoTasks;