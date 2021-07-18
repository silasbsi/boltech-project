import React, { useState, useEffect } from 'react';
import { IoTrashOutline } from 'react-icons/io5'
import { AiOutlineDatabase } from "react-icons/ai";
import { GoPencil } from 'react-icons/go'
import ProjectService from '../../services/projectService';
import TaskService from '../../services/taskService';

import './index.css';

const ProjectCard = (props) => {
    const { 
        name = '', 
        _id,
        createdDate
    } = props.project;

    const [changeTitle, setChangeTitle] = useState(false);
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [title, setTitle] = useState(name);
    const [todoTasks, setTodoTasks] = useState(null);
    const [doneTasks, setDonetasks] = useState(null);

    const handleTitleOnBlur= () => {
        const payload = {
            projectId: _id,
            projectTitle: title
        };

        ProjectService.update(payload);

        setChangeTitle(!changeTitle);
    }

    const handleAddTask = () => {
        if (newTaskDescription) {
            const payload = {
                projectId: _id,
                taskDescription: newTaskDescription
            };
            
            const response = TaskService.create(payload);

            if (response.task) {
                setTodoTasks([...todoTasks, response.task])
            }

            setNewTaskDescription('');
        }
    }

    const handleProjectDelete = (projectId) => {
        if (typeof props.deleteFunction === 'function') {
            props.deleteFunction(projectId);
        }
    }

    const handleTaskDelete = (projectId, taskId) => {
        const payload = {
            projectId,
            taskId
        };
        
        const response = TaskService.delete(payload);
        
        if (response.taskId) {
            const remainingTasks = todoTasks?.filter(task => task._id !== response.taskId);
            setTodoTasks(remainingTasks)
        }
    }

    const handleCheckboxClick = (projectId, taskId) => {
        const payload = {
            projectId,
            taskId
        };
        
        const response = TaskService.finish(payload);
        
        if (response.task) {
            const remainingTodoTasks = todoTasks?.filter(task => task._id !== response.task._id);
            setTodoTasks(remainingTodoTasks);
            
            if (doneTasks) {
                setDonetasks([...doneTasks, response.task]);
            } else {
                setDonetasks(response.task);
            }
            
        }
    }

    useEffect(() => {
        const payload = { 
            projectId: _id
        };
        const allTasks = TaskService.all(payload);

        if (allTasks.tasks === undefined) {
            setDonetasks({});
            setTodoTasks({});
        }
        else {
            const doneTasksList = allTasks?.tasks?.filter(task => task.finishedDate);
            const todoTasksList = allTasks?.tasks?.filter(task => !task.finishedDate);
            setDonetasks(doneTasksList);
            setTodoTasks(todoTasksList);
        }
        
        
    }, [])

    return (
        <div className="project-card">
            <div className="project-card-header">
                {
                    changeTitle ? 
                        <input 
                            className="project-card-title-input"
                            type="text"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            placeholder={name}
                            onBlur={handleTitleOnBlur}
                            onent={handleTitleOnBlur}
                            autoFocus={true}
                        />
                        :
                        <span className="project-card-title-span" title={`${title} | Creation date: ${new Date(createdDate).toLocaleString("en-EN")}`}>{title}</span>
                }
                <div>
                    <GoPencil className="project-card-icons" onClick={() => setChangeTitle(!changeTitle)} />
                    <IoTrashOutline className="project-card-icons" onClick={() => handleProjectDelete(_id)} />
                </div>
            </div>
            <div>
            <div className="project-card-content">
                <p>To Do</p>
                <div className="todo-list">
                    {todoTasks?.length > 0 ?
                        todoTasks.map(task => (
                            <div key={task._id} className="list-item" title={`${task.description} | Creation date: ${new Date(task.createdDate).toLocaleString("en-EN")}`}>
                                <input 
                                    type="checkbox" 
                                    id={task._id} 
                                    name={task._id} 
                                    value={task._id} 
                                    onChange={() => handleCheckboxClick(_id, task._id)} 
                                />
                                <label for={task._id}>{task.description}</label>
                                <IoTrashOutline onClick={() => handleTaskDelete(_id, task._id)}/>
                            </div>
                        ))
                        :
                        (
                            <div className="project-card-no-data">
                                <AiOutlineDatabase />
                                <span>No tasks</span>
                            </div>
                        )
                    }
                </div>  
                <p>Done</p>
                <div className="done-list">
                    {doneTasks?.length > 0 ?
                        doneTasks.map(task => (
                            <div key={task._id}  className="list-item" title={`${task.description} | Creation date: ${new Date(task.createdDate).toLocaleString("en-EN")} | Finish date: ${new Date(task.finishedDate).toLocaleString("en-EN")}`}>
                                <input 
                                    type="checkbox" 
                                    id={task._id} 
                                    name={task._id} 
                                    value={task._id} 
                                    checked 
                                    disabled 
                                />
                                <label for={task._id}>{task.description}</label>
                            </div>
                        ))
                        :
                        (
                            <div className="project-card-no-data">
                                <AiOutlineDatabase />
                                <span>No tasks</span>
                            </div>
                        )
                    }
                </div>  
            </div>
                <div className="project-card-footer">
                    <input 
                        type="text" 
                        value={newTaskDescription} 
                        onChange={(e) => setNewTaskDescription(e.target.value)} 
                        placeholder="Task"
                        className="new-task-input" 
                    />
                    <button className="new-task-button" onClick={handleAddTask}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;