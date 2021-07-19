import React, { useState, useEffect } from 'react';
import { IoTrashOutline } from 'react-icons/io5'
import { AiOutlineDatabase } from "react-icons/ai";
import { GoPencil } from 'react-icons/go'
import ProjectService from '../../services/projectService';
import TaskService from '../../services/taskService';
import { useToasts } from 'react-toast-notifications';
import TodoTasks from './TodoTasks';
import DoneTasks from './DoneTasks';
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

    const { addToast, removeAllToasts } = useToasts();

    const handleTitleOnBlur= () => {
        const payload = {
            projectId: _id,
            projectTitle: title
        };

        const response = ProjectService.update(payload);

        if (response?.error) {
            addToast(response?.error, { appearance: 'error' });
            setTimeout(() => removeAllToasts(), 3000);
        }

        setChangeTitle(!changeTitle);
    }

    const handleAddTask = () => {
        if (newTaskDescription) {
            const payload = {
                projectId: _id,
                taskDescription: newTaskDescription
            };
            
            const response = TaskService.create(payload);

            if (response?.task) {
                setTodoTasks([...todoTasks, response.task])
            } else {
                addToast(response?.error, { appearance: 'error' });
                setTimeout(() => removeAllToasts(), 3000);
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
        
        if (response?.taskId) {
            const remainingTasks = todoTasks?.filter(task => task._id !== response.taskId);
            setTodoTasks(remainingTasks)
        } else {
            addToast(response?.error, { appearance: 'error' });
            setTimeout(() => removeAllToasts(), 3000);
        }
    }

    const handleCheckboxClick = (projectId, taskId) => {
        const payload = {
            projectId,
            taskId
        };
        
        const response = TaskService.finish(payload);
        
        if (response?.task) {
            const remainingTodoTasks = todoTasks?.filter(task => task._id !== response.task._id);
            setTodoTasks(remainingTodoTasks);
            
            if (doneTasks) {
                setDonetasks([...doneTasks, response.task]);
            } else {
                setDonetasks(response.task);
            }            
        } else {
            addToast(response?.error, { appearance: 'error' });
            setTimeout(() => removeAllToasts(), 3000);
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
    }, [_id])

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
                            autoFocus={true}
                            onKeyUp={(e) => e.keyCode === 13 ? handleTitleOnBlur() : null}
                        />
                        :
                        <span 
                            className="project-card-title-span" 
                            title={`${title} | Creation date: ${new Date(createdDate).toLocaleString("en-EN")}`}
                        >{title}</span>
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
                                <TodoTasks task={task} handleCheckboxClick={handleCheckboxClick} handleTaskDelete={handleTaskDelete} projectId={_id} />
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
                                <DoneTasks task={task} />
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
                        onKeyUp={(e) => e.keyCode === 13 ? handleAddTask() : null}
                    />
                    <button className="new-task-button" onClick={handleAddTask}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;