import React,{ useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import ProjectCard from '../../Components/ProjectCard';
import ProjectService from '../../services/projectService'
import './index.css';

const Dashboard = (props) => {
    const [newProject, setNewProject] = useState('');
    const [projects, setProjects] = useState(null);
    
    const handleClick = () => {
        const payload = {
            name: newProject,
            userId: "60f2ea498b011d4fcc3e8790"
        }

        const response = ProjectService.register(payload);

        setProjects([...projects, response.project]);
    }

    useEffect(()=> {
        const payload = { 
            userId: "60f2ea498b011d4fcc3e8790" 
        };
        const allProjects = ProjectService.all(payload);
        setProjects(allProjects.projects)
    }, [])
    
    return (
        <>
            <Navbar />
            <div className="dashboard-content">
                <div className="project-content">
                    {
                        projects?.map(project => (
                            <ProjectCard key={project._id} project={project}/>
                        ))
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