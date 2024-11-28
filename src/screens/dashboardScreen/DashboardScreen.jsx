import { useEffect, useState } from "react";
import Container from "../../components/Container/container";
import styles from "./DashboardScreen.module.css"
import Card from "../../components/Card/card";
import DonutChart from "../../components/charts/DonutChart";
const DashboardScreen = () => {
    const [filterType, setFilterType] = useState('All');
    const projects = [
        {
            id: 1,
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ali Mohammed'
            }
        },
        {
            id: 2,
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ali Mohammed'
            }
        },
        {
            id: 3,
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ali Mohammed'
            }
        },
        {
            id: 4,
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ali Mohammed'
            }
        },
        {
            id: 5,
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ali Mohammed'
            }
        },
        {
            id: 6,
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ali Mohammed'
            }
        },
    ]
    
    const chartData = [
        { value: 50, color: "#FFD700" }, // Yellow
      ];
    useEffect(() => {

    }, [filterType])
    return (
        
        <div className={styles.dashboardContainer}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.projectsContainer}>
                        <div className={styles.projectsHeader}>
                            <button onClick={() => setFilterType('All')} className={filterType === 'All' && styles.active}>All</button>
                            <button onClick={() => setFilterType('Pending')}>Pending</button>
                            <button onClick={() => setFilterType('In Progress')}>InProgress</button>
                            <button onClick={() => setFilterType('Completed')}>Completed</button>
                        </div>
                        <div className={styles.ProjectsInfo}>
                            {projects.map((project) => (
                                <Card key={project.id} marginTop={24}>
                                    <div className={styles.projectItem}>
                                        <div>
                                            <h3>{project.projectName}</h3>
                                            <p>{project.progress}</p>
                                        </div>
                                        
                                        <DonutChart data={chartData} size={100} total={100} emptyColor="#D9D9D9" strokeWidth={6}>
                                            {chartData[0].value}%
                                        </DonutChart>
                                    </div>
                                    <div>
                                        <img src={project.user.image} alt="" />
                                        <p>{project.user.name}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div style={{backgroundColor: 'green'}}>
                        right
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default DashboardScreen;