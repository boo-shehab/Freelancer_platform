import { useState } from "react";
import styles from './SliderOfProject.module.css';
import CloseSliderIcon from '../../CustomIcons/CloseSliderIcon';
import MessageEdit from '../../CustomIcons/MessageEdit';
import DeleteIcon from '../../CustomIcons/DeleteIcon';
import DonutChart from "../../components/charts/DonutChart";


const SliderOfProject = ({
    show,
    onClose,
    freelancers,
    onRemoveFreelancer,
    projectStatus,
    progress,
    tasks,
    handleEdit,
    handleDelete
}) => {
    if (!show) return null;

    const [selectedTab, setSelectedTab] = useState("To Do");
    const [isFreeLancer, setIsFreeLancer] = useState(true);

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    return (

        <div className={styles.sliderOFprojectinfo}>
            <div className={styles.slider}>
                <div className={styles.projectName}>
                    <button onClick={onClose}>
                        <CloseSliderIcon />
                    </button>
                    <h1>Project Name</h1>
                </div>

                <div className={styles.StatusContainer}>
                    <div className={styles.StatusOFproject}>
                        <label>
                            <div className={styles.dote}></div>
                            <p>Status:</p>
                            <a
                                href="#"

                                style={{ color: projectStatus === "In Progress" ? '#D69E2E' : '#3182CE' }}
                            >{projectStatus}</a>
                        </label>
                        <label>
                            <div className={styles.dote}></div>
                            <p>Timeline:</p>
                            <span>2 months</span>
                        </label>
                    </div>

                    <div className={styles.chartContainer}>
                        {projectStatus === "In Progress" && (
                            <DonutChart
                                data={[{ value: progress, color: projectStatus === 'Completed' ? '#1FAD58' : '#FFBF00' }]}
                                total={100}
                                size={70}
                                barSize={4}
                            >
                                <p className={styles.ChartText}>{progress}%</p>
                            </DonutChart>
                        )}
                    </div>
                </div>

                <div className={styles.sliderDescription}>
                    <h1>Project Description :</h1>
                    <p>
                        Develop an app for daily task management ..... <button>see more</button>
                    </p>
                </div>
                {projectStatus === "Pending" && (

                    <div className={styles.freeLancerList}>
                        
                        <h1>{freelancers.length} Freelancer Applied:</h1>
                        <div className={styles.freelancerApplied}>
                            {freelancers.map((freelancer) => (
                                <div key={freelancer.id} className={styles.singleFreeLancer}>
                                    <div className={styles.freeLancerInfo}>
                                        <img src={freelancer.imag} alt="" />
                                        <div className={styles.freeLancerText}>
                                            <h1>{freelancer.name}</h1>
                                            <p>{freelancer.type}</p>
                                        </div>
                                    </div>
                                    <div className={styles.freeLancerAction}>
                                        <button
                                            onClick={() => onRemoveFreelancer(freelancer.id)}
                                            className={styles.acceptFreeLancer}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => onRemoveFreelancer(freelancer.id)}
                                            className={styles.declineFreeLancer}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {projectStatus === "In Progress" && (
                    <div>
                        <h3>{isFreeLancer ? "Freelancer Tasks" : "My Tasks"}</h3>
                        <div className={styles.taskTabs}>

                            <a
                                href="#todo"
                                className={`${styles.tab} ${selectedTab === "To Do" ? styles.activeTab : ""}`}
                                onClick={() => handleTabClick("To Do")}
                            >
                                To Do
                            </a>
                            <a
                                href="#inprogress"
                                className={`${styles.tab} ${selectedTab === "In Progress" ? styles.activeTab : ""}`}
                                onClick={() => handleTabClick("In Progress")}
                            >
                                In Progress
                            </a>
                            <a
                                href="#inreview"
                                className={`${styles.tab} ${selectedTab === "In Review" ? styles.activeTab : ""}`}
                                onClick={() => handleTabClick("In Review")}
                            >
                                In Review
                            </a>
                            <a
                                href="#done"
                                className={`${styles.tab} ${selectedTab === "Done" ? styles.activeTab : ""}`}
                                onClick={() => handleTabClick("Done")}
                            >
                                Done
                            </a>
                        </div>
                    </div>
                )}

                {(projectStatus === "In Progress") && (
                    <>
                        {selectedTab === "To Do" && (
                            <div className={styles.taskList}>
                                {tasks.map((task) => (
                                    <div key={task.id} className={styles.task}>
                                        <p>{task.name}</p>
                                        <div className={styles.taskActions}>
                                            <button
                                                onClick={() => handleEdit(task.id)}
                                                className={styles.editButton}
                                            >
                                                <span role="img" aria-label="edit"><MessageEdit /></span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                className={styles.deleteButton}
                                            >
                                                <span role="img" aria-label="delete"><DeleteIcon /></span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedTab === "In Progress" && (
                            <div className={styles.taskList}>
                                {tasks.map((task) => (
                                    <div key={task.id} className={styles.task}>
                                        <p>{task.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedTab === "In Review" && (
                            <div className={styles.taskList}>
                                {tasks.map((task) => (
                                    <div key={task.id} className={styles.task}>
                                        <div className={styles.taskActions}>
                                            <input
                                                type="checkbox"
                                                id={`task-${task.id}`}
                                                className={styles.checkbox}
                                            />
                                            <p className={styles.Task}>{task.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedTab === "Done" && (
                            <div className={styles.taskList}>
                                {tasks.map((task) => (
                                    <div key={task.id} className={styles.task}>
                                        <div className={styles.taskActions}>
                                            <input
                                                type="checkbox"
                                                id={`task-${task.id}`}
                                                checked
                                                className={`${styles.checkbox} ${styles.checked}`}
                                            />
                                            <p className={styles.doneTask}>{task.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>

    );
};

export default SliderOfProject;
