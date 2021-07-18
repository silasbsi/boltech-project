import React,{ useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import ProjectCard from '../../Components/ProjectCard';
import ProjectService from '../../services/projectService'
import { AiOutlineDatabase } from "react-icons/ai";

import './index.css';

const Dashboard = () => {
    const [newProject, setNewProject] = useState('');
    const [projects, setProjects] = useState(null);
    const USER_ID = localStorage.getItem('userId');
    
    const handleClick = () => {
        if (newProject) {
            const payload = {
                name: newProject,
                userId: USER_ID
            }

            const response = ProjectService.register(payload);

            const allProjects = [...projects, response.project];

            console.log(allProjects)
            console.log(allProjects.reverse(a => a.createdDate))
            
            setProjects(allProjects);
        }
    }

    const handleProjectDelete = (projectId) => {
        const payload = {
            projectId
        };
        
        const response = ProjectService.delete(payload);

        if (response) {
            const remainingProjects = projects?.filter(project => project._id !== response.projectId);
            setProjects(remainingProjects);
        }
    }

    useEffect(()=> {
        const payload = { 
            body: {
                userId: USER_ID
            }
        };
        const allProjects = ProjectService.all(payload);
        console.log(allProjects)
        allProjects.projects.reverse(a => a.createdDate);
        setProjects(allProjects.projects)
    }, [])
    
    return (
        <>
            <Navbar />
            <div className="dashboard-content">
                <div className="project-content">
                    {projects?.length > 0 ?
                        projects?.map(project => (
                            <ProjectCard 
                                key={project._id} 
                                project={project} 
                                deleteFunction={handleProjectDelete} 
                            />
                        ))
                        :
                        (
                            <div className="project-no-data">
                                <div className="project-no-data-background">
                                    <AiOutlineDatabase />
                                    <span>No projects</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="new-project">
                    <div className="new-project-content"> 
                        <h3>Create a new project</h3>
                        <input 
                            type="text"
                            value={newProject}
                            onChange={e => setNewProject(e.target.value)}
                            placeholder="Project name"
                        />
                        <button onClick={handleClick}>Create project</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;