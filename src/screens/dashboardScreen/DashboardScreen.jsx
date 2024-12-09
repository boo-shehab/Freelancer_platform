import { useEffect, useState } from "react";
// import Container from "../../components/Container/container";
import styles from "./DashboardScreen.module.css"
import Container from "../../components/Container/container";
import Card from "../../components/Card/card";
import DonutChart from "../../components/charts/DonutChart";
// import CloseSliderIcon from "../../CustomIcons/CloseSliderIcon";
import SliderOfProject from '../../components/SliderOfProject/SliderOfProject';

const DashboardScreen = () => {
    const [showSlider, setshowSlider] = useState(0);
    const [filterType, setFilterType] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const [tasks, setTasks] = useState([
        { id: 1, name: 'Design Registration Screen', status: 'To Do' },
        { id: 2, name: 'Design Registration Screen', status: 'To Do' },
        { id: 3, name: 'Design Registration Screen', status: 'To Do' },
        { id: 4, name: 'Design Registration Screen', status: 'In Progress' },
        { id: 5, name: 'Design Registration Screen', status: 'In Progress' },
        { id: 6, name: 'Design Registration Screen', status: 'In Progress' },
        { id: 7, name: 'Design Registration Screen', status: 'In Review' },
        { id: 8, name: 'Design Registration Screen', status: 'In Review' },
        { id: 9, name: 'Design Registration Screen', status: 'In Review' },
        { id: 10, name: 'Design Registration Screen', status: 'Done' },
        { id: 11, name: 'Design Registration Screen', status: 'Done' },
        { id: 12, name: 'Design Registration Screen', status: 'Done' },
    ]);



    const projects = [
        {
            id: 1,
            projectName: 'ProjectName 1',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 2,
            projectName: 'ProjectName 2',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 3,
            projectName: 'ProjectName 3',
            projectStatus: 'Completed',
            progress: 100,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 4,
            projectName: 'ProjectName 4',
            projectStatus: 'Completed',
            progress: 100,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 5,
            projectName: 'ProjectName 5',
            projectStatus: 'Pending',
            progress: 0,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 6,
            projectName: 'ProjectName 6',
            projectStatus: 'Pending',
            progress: 0,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        }
    ]
    const rating = {
        starRate: '4.0',
        highRate: 53,
        midRate: 12,
        lowRate: 35
    }

    useEffect(() => {

    }, [filterType])

    const [freelancerApplied, setfreelancerApplied] = useState([
        {
            id: 1,
            imag: './avatar.png',
            name: "Sara Saad",
            type: "UIUX Designer",
        },
        {
            id: 2,
            imag: './avatar.png',
            name: "Mohamed ali",
            type: "UIUX Designer",
        },
        {
            id: 3,
            imag: './avatar.png',
            name: "Ali Saad",
            type: "UIUX Designer",
        },
    ]);

    const removeFreelancerById = (id) => {
        setfreelancerApplied((prevState) =>
            prevState.filter((freelancer) => freelancer.id !== id)
        );
    };

    const handleProjectClick = (projectId) => {
        const project = projects.find((project) => project.id === projectId);
        setSelectedProject(project);
        setshowSlider(1);
    };

    const handleEdit = (taskId) => {
        const taskName = prompt("Edit Task Name:");
        if (taskName) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, name: taskName } : task
                )
            );
        }
    };

    const handleDelete = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }
    };
    const handleTaskStatusChange = (taskId, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <div className={styles.dashboardContainer}>
            <Container>
                <div className={styles.content}>
                    <section className={styles.section1}>
                        <div className={styles.projectsHeader}>
                            <button onClick={() => setFilterType('All')} className={filterType === 'All' && styles.active}>All</button>
                            <button onClick={() => setFilterType('Pending')}>Pending</button>
                            <button onClick={() => setFilterType('In Progress')}>InProgress</button>
                            <button onClick={() => setFilterType('Completed')}>Completed</button>
                        </div>
                        <div className={styles.projects}>
                            {projects.map((project) => (
                                <button className={styles.projectBtn} key={project.id} onClick={() => handleProjectClick(project.id)}>
                                    <div className={styles.projectInfo}>
                                        <div className={`${styles.projectData} ${project.projectStatus === 'Completed' ? styles.completed : project.projectStatus === 'Pending' ? styles.pending : styles.inProgress}`}>
                                            <b>{project.projectName}</b>
                                            <p>{project.projectStatus}</p>
                                        </div>
                                        <DonutChart data={[{ value: project.progress, color: project.projectStatus === 'Completed' ? '#1FAD58' : '#FFBF00' }]} total={100} size={70} barSize={4}>
                                            <p className={styles.ChartText}>{project.progress}%</p>
                                        </DonutChart>
                                    </div>
                                    <div className={styles.projectUserInfo}>
                                        <img src={project.user.image} alt="" />
                                        <p>{project.user.name}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                    <div className={styles.section2}>                        <div className={styles.statistics}>
                        <div className={styles.card}>
                            <p>total projects</p>
                            <b>7</b>
                        </div>
                        <div className={styles.card}>
                            <p>total projects</p>
                            <b>7</b>
                        </div>
                        <div className={styles.card}>
                            <p>total projects</p>
                            <b>7</b>
                        </div>
                        <div className={styles.card}>
                            <p>total projects</p>
                            <b>7</b>
                        </div>
                    </div>

                        <Card marginTop={12}>
                            <div className={styles.statisticsSection}>
                                <div className={styles.totalDonutChart}>
                                    <h2>Total Tasks - 21</h2>
                                    <DonutChart data={[{ value: 50, color: '#1FAD58' }]} total={100} size={150} barSize={10}>
                                        <DonutChart data={[{ value: 40, color: '#D69E2E' }]} total={100} size={110} barSize={10}>
                                            <DonutChart data={[{ value: 20, color: '#3C97AF' }]} total={100} size={70} barSize={10}>
                                            </DonutChart>
                                        </DonutChart>
                                    </DonutChart>
                                </div>

                                <div className={styles.ratingBar}>
                                    <div className={styles.barItem}>
                                        <b>To Do 35%</b>
                                        <div className={styles.bar}>
                                            <div style={{ width: `${rating.lowRate}%`, backgroundColor: '#3C97AF' }}></div>
                                        </div>
                                    </div>
                                    <div className={styles.barItem}>
                                        <b>In Progress 12%</b>
                                        <div className={styles.bar}>
                                            <div style={{ width: `${rating.midRate}%`, backgroundColor: '#D69E2E' }}></div>
                                        </div>
                                    </div>
                                    <div className={styles.barItem}>
                                        <b>Done 53%</b>
                                        <div className={styles.bar}>
                                            <div style={{ width: `${rating.highRate}%`, backgroundColor: '#1FAD58' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
            <SliderOfProject
                show={!!showSlider}
                onClose={() => setshowSlider(0)}
                freelancers={freelancerApplied}
                onRemoveFreelancer={removeFreelancerById}
                projectStatus={selectedProject ? selectedProject.projectStatus : ''}
                progress={selectedProject ? selectedProject.progress : ''}
                tasks={selectedProject ? tasks : []}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                taskStatus={selectedProject ? tasks.map(task => task.status) : []}
                onStatusChange={handleTaskStatusChange}
            />

        </div>
    );
};

export default DashboardScreen;
