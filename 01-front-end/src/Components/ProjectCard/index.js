import React, { useState } from 'react';
import './index.css';
import { IoTrashOutline } from 'react-icons/io5'

import ProjectService from '../../services/projectService';

import { GoPencil } from 'react-icons/go'
const ProjectCard = (props) => {
    const { name } = props.project;
    const [changeTitle, setChangeTitle] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [title, setTitle] = useState('');

    const handleTitleOnBlur= () => {
        
        setChangeTitle(!changeTitle);
    }

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
                        <span>{name}</span>
                }
                <div>
                    <GoPencil onClick={() => setChangeTitle(!changeTitle)} />
                    <IoTrashOutline />
                </div>
            </div>
            <div>
            <div className="project-card-content">
                <p>To Do</p>

                <div className="todo-list">
                    <div className="list-item">
                        <input type="checkbox" id="01" name="01" value="01" />
                        <label for="01">Lorem ipsum dolor sit amet</label>
                        <IoTrashOutline />
                    </div>
                    <div className="list-item">
                        <input type="checkbox" id="02" name="02" value="02" />
                        <label for="02">Lorem ipsum dolor sit amet</label>
                        <IoTrashOutline />
                    </div>
                    <div className="list-item">
                        <input type="checkbox" id="03" name="03" value="03" />
                        <label for="03">Lorem ipsum dolor sit amet</label>
                        <IoTrashOutline />
                    </div>
                    <div className="list-item">
                        <input type="checkbox" id="04" name="04" value="04" />
                        <label for="04">Lorem ipsum dolor sit amet</label>
                        <IoTrashOutline />
                    </div>
                    <div className="list-item">
                        <input type="checkbox" id="05" name="05" value="05" />
                        <label for="05">Lorem ipsum dolor sit amet</label>
                        <IoTrashOutline />
                    </div>
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
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)} 
                        placeholder="Task"
                        className="new-task-input" />
                    <button className="new-task-button">Add</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;