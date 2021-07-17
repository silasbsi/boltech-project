import React from 'react';
import Navbar from '../../Components/Navbar';
import ProjectCard from '../../Components/ProjectCard';

import './index.css';

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="dashboard-content">
                <div className="project-content">
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </div>
                <div className="new-project">
                    <div className="new-project-content"> 
                        <h3>Create a new project</h3>
                        <input 
                            type="text"
                            placeholder="Project name"
                        />
                        <button onClick={() => console.log('Criando projeto novo')}>Create project</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;