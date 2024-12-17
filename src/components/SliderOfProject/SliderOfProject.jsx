import { useState } from "react";
import styles from './SliderOfProject.module.css';
import CloseSliderIcon from '../../CustomIcons/CloseSliderIcon';
import MessageEdit from '../../CustomIcons/MessageEdit';
import DeleteIcon from '../../CustomIcons/DeleteIcon';
import InProgressIcon from '../../CustomIcons/InProgressIcon';
import InReviewIcon from '../../CustomIcons/InReviewIcon';
import DonutChart from "../../components/charts/DonutChart";
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm';
import AddTaskIcon from '../../CustomIcons/AddTaskIcon';
import SubList from './SubList';

const SliderOfProject = ({
    show,
    onClose,
    projectData, 
    callbacks, 
}) => {
    if (!show) return null;

    const [selectedTab, setSelectedTab] = useState("To Do");
    const [isFreeLancer, setIsFreeLancer] = useState(true);
    const [isSubListVisible, setIsSubListVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleTabClick = (tabName) => setSelectedTab(tabName);

    const handleToggleSubList = (taskId) => {
        setIsSubListVisible((prevState) => ({
            ...prevState,
            [taskId]: !prevState[taskId],
        }));
    };

    const handleStatusChange = (taskId, newStatus) => {
        callbacks.onStatusChange(taskId, newStatus);
        setSelectedTab(newStatus);
    };

    const areAllTasksDone = projectData.tasks.every((task) => task.status === "Done");

    const {
        projectStatus,
        progress,
        tasks,
        freelancers,
        projectId
    } = projectData;

    const {
        onRemoveFreelancer,
        handleEdit,
        handleDelete,
        addTask,
        onComplete
    } = callbacks;

    return (
        <div className={styles.sliderOFprojectinfo}>
            <AddTaskForm
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                addTask={addTask}
                tasks={tasks}
            />
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
                            >
                                {projectStatus}
                            </a>
                        </label>
                        <label>
                            <div className={styles.dote}></div>
                            <p>Timeline:</p>
                            <span>2 months</span>
                        </label>
                    </div>

                    <div className={styles.chartContainer}>
                            <DonutChart
                                data={[{ value: progress, color: projectStatus === 'Completed' ? '#1FAD58' : '#FFBF00' }]}
                                total={100}
                                size={70}
                                barSize={4}
                            >
                                <p className={styles.ChartText}>{progress}%</p>
                            </DonutChart>
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
                            {freelancers.map(({ id, name, type, imag }) => (
                                <div key={id} className={styles.singleFreeLancer}>
                                    <div className={styles.freeLancerInfo}>
                                        <img src={imag} alt={`${name}'s profile`} />
                                        <div className={styles.freeLancerText}>
                                            <h1>{name}</h1>
                                            <p>{type}</p>
                                        </div>
                                    </div>
                                    <div className={styles.freeLancerAction}>
                                        <button
                                            onClick={() => callbacks.onAcceptFreelancer(id)}
                                            className={styles.acceptFreeLancer}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => onRemoveFreelancer(id)}
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
                    <>
                        <div className={styles.tasksSection}>
                            <h3 className={styles.titelText}>
                                {isFreeLancer ? "My Tasks" : "Freelancer Tasks"}
                            </h3>
                            {!isFreeLancer && (
                                <button className={styles.addTaskButton} onClick={() => setIsOpen(true)}>
                                    <AddTaskIcon />
                                </button>
                            )}
                            <div className={styles.taskTabs}>
                                {["To Do", "In Progress", "In Review", "Done"].map((tab) => (
                                    <a
                                        key={tab}
                                        href={`#${tab.toLowerCase().replace(" ", "")}`}
                                        className={`${styles.tab} ${selectedTab === tab ? styles.activeTab : ""}`}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className={styles.taskList}>
                            {tasks
                                .filter((task) => task.status === selectedTab)
                                .map(({ id, name }) => (
                                    <div
                                        key={id}
                                        className={`${styles.task} ${!isFreeLancer ? styles.withJustifyContent : ""}`}
                                    >
                                        {selectedTab === "Done" && isFreeLancer && (
                                            <input
                                                type="checkbox"
                                                id={`task-${id}`}
                                                checked
                                                readOnly
                                                className={`${styles.checkbox} ${styles.checked}`}
                                            />
                                        )}
                                        <div className={styles.iconContainer}>
                                            {isFreeLancer && selectedTab === "In Progress" && (
                                                <InProgressIcon className={styles.inProgressIcon} />
                                            )}
                                            {isFreeLancer && selectedTab === "In Review" && (
                                                <InReviewIcon className={styles.inReviewIcon} />
                                            )}
                                        </div>

                                        <p
                                            onClick={
                                                isFreeLancer && selectedTab !== "Done"
                                                    ? () => handleToggleSubList(id)
                                                    : undefined
                                            }
                                            className={selectedTab === "Done" ? styles.doneTask : ""}
                                        >
                                            {name}
                                        </p>

                                        {isFreeLancer && isSubListVisible[id] && selectedTab !== "Done" && (
                                            <SubList taskId={id} onStatusChange={handleStatusChange} />
                                        )}

                                        {!isFreeLancer && selectedTab === "To Do" && (
                                            <div className={styles.buttonContainer}>
                                                <button onClick={() => handleEdit(id)} className={styles.editButton}>
                                                    <MessageEdit />
                                                </button>
                                                <button onClick={() => handleDelete(id)} className={styles.deleteButton}>
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>

                        {areAllTasksDone && (
                            <button className={styles.completeBtn} onClick={() => onComplete(projectId)}>
                                Project Complete
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SliderOfProject;
