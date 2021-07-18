import React, { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5'

import ProjectService from '../../services/projectService';
import TaskService from '../../services/taskService';

import { GoPencil } from 'react-icons/go'
import { useEffect } from 'react';

import './index.css';

const ProjectCard = (props) => {
    const { name, _id } = props.project;
    const [changeTitle, setChangeTitle] = useState(false);
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState(null);

    const handleTitleOnBlur= () => {
        const payload = {
            projectId: _id,
            projectTitle: title
        };

        ProjectService.update(payload);

        setChangeTitle(!changeTitle);

    }

    const handleAddTask = () => {
        const payload = {
            projectId: _id,
            taskDescription: newTaskDescription
        };
        
        const response = TaskService.create(payload);

        if (response) {
            setTasks([...tasks, response.task])
        }
    }


    useEffect(() => {
        setTitle(name);

        const payload = { projectId: _id};
        const allTasks = TaskService.all(payload)
        console.table(allTasks.tasks);
        setTasks(allTasks.tasks);
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
                            autoFocus={true}
                        />
                        :
                        <span className="project-card-title-span" title={title}>{title}</span>
                }
                <div>
                    <GoPencil className="project-card-icons" onClick={() => setChangeTitle(!changeTitle)} />
                    <IoTrashOutline className="project-card-icons" />
                </div>
            </div>
            <div>
            <div className="project-card-content">
                <p>To Do</p>

                <div className="todo-list">
                    {
                        tasks?.map(task => (
                            <div key={task._id} className="list-item">
                                <input type="checkbox" id={task._id} name={task._id} value={task._id} />
                                <label for={task._id}>{task.description}</label>
                                <IoTrashOutline />
                            </div>
                        ))
                    }
                </div>  
                <p>Done</p>

                <div className="done-list">
                    <div className="list-item">
                        <input type="checkbox" id="01" name="01" value="01" />
                        <label for="01">Lorem ipsum dolor sit amet</label>
                    </div>
                    <div className="list-item">
                        <input type="checkbox" id="02" name="02" value="02" />
                        <label for="02">Lorem ipsum dolor sit amet</label>
                    </div>
                    <div className="list-item">
                        <input type="checkbox" id="03" name="03" value="03" />
                        <label for="03">Lorem ipsum dolor sit amet</label>
                    </div>
                    <div className="list-item">
                        <input type="checkbox" id="04" name="04" value="04" />
                        <label for="04">Lorem ipsum dolor sit amet</label>
                    </div>
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