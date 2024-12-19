import { useState, useEffect } from "react";
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
import useUserinfoStore from "../../useUserinfoStore";
import FetchData from "../../utility/fetchData";

    const [selectedTab, setSelectedTab] = useState("toDo");
    const [isSubListVisible, setIsSubListVisible] = useState({});

//     // Handlers
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


const SliderOfProject = ({ show, onClose, projectData }) => {
    const { isFreelancer } = useUserinfoStore();
    const [projectInfo, setProjectInfo] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [dotsDescription, setDotsDescription] = useState("....");
    const [seeAction, setSeeAction] = useState("See More");
    const [descriptionState, setDescriptionState] = useState("");
    const [freelancerApplied, setFreelancerApplied] = useState([]);
    const [selectedTab, setSelectedTab] = useState("to-do");

    const { projectId, progress, projectStatus } = projectData || {};
    // Fetch project data and freelancer bids when the projectId changes
    const getProjectInfo = async () => {
        try {
            const data = await FetchData(`profiles/${projectId}`, { method: 'GET' });
            if (data.isSuccess) {
                setProjectInfo(data.results || {});
                const description = data.results.projects && data.results.projects[0] ? data.results.projects[0].description || "" : "";
                setDescriptionState(description.slice(0, 200));
            } else {
                console.error("Failed to fetch project info");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getFreelancerApplied = async () => {
        try {
            const data = await FetchData(`projects/${projectId}/bids?page=0&pageSize=100`, { method: 'GET' });

            setFreelancerApplied(data.result);

        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };



    const getTasks = async () => {
        try {
            const data = await FetchData(`projects/${projectId}/tasks?status=`, { method: 'GET' });

            if (data.isSuccess) {
                setTasks(data.results || {});
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error("You do not have permission to view these tasks.");
                alert("You do not have permission to view these tasks.");
            } else {
                console.error("Error fetching data:", error);
            }
        }
    };

    useEffect(() => {
        if (projectId) {
            getProjectInfo();
            getFreelancerApplied();
            getTasks();
        }
    }, [projectId]);


    const FreelancerAction = async (projectId, bidId, action) => {
        const url = `projects/${projectId}/bids/${bidId}/${action}`;
        try {
            const response = await FetchData(url, { method: 'POST' });

            if (response.isSuccess) {
                console.log(`Freelancer ${action}ed successfully!`);
                setFreelancerApplied(freelancerApplied.filter(f => f.id !== bidId));
                getProjectInfo();
            } else {
                console.error(`Failed to ${action} freelancer:`, response);
            }
        } catch (error) {
            console.error(`Error ${action}ing freelancer:`, error);
        }
    };

    // const ChangeTheTaskStutas = async (projectId, bidId, action) => {
    //     const url = `projects/${projectId}/bids/${bidId}/${action}`;
    //     try {
    //         const response = await FetchData(url, { method: 'POST' });

    //         if (response.isSuccess) {
    //             console.log(`Freelancer ${action}ed successfully!`);
    //             setFreelancerApplied(freelancerApplied.filter(f => f.id !== bidId));
    //             getProjectInfo();
    //         } else {
    //             console.error(`Failed to ${action} freelancer:`, response);
    //         }
    //     } catch (error) {
    //         console.error(`Error ${action}ing freelancer:`, error);
    //     }
    // };

    if (!show) return null;

    const handleSeeMore = () => {
        const fullDescription = projectInfo.projects && projectInfo.projects[0] ? projectInfo.projects[0].description : "";
        if (fullDescription.length < 200) {
            setDotsDescription("");
            setSeeAction("");
            setDescriptionState(fullDescription);
        } else if (dotsDescription === "...." && seeAction === "See More") {
            setDescriptionState(fullDescription);
            setDotsDescription("");
            setSeeAction("Show Less");
        } else {
            setDescriptionState(fullDescription.slice(0, 200));
            setDotsDescription("....");
            setSeeAction("See More");
        }
    };

    const AddTask = async (taskData) => {
        try {
            const response = await FetchData(`projects/${projectId}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (response.isSuccess) {
                setTasks((prevTasks) => [...prevTasks, response.result]);
                setIsOpen(false);
                console.log('Task added successfully');
            } else {
                console.error('Failed to add task:', response);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    const canCompleteProject = !isFreelancer && tasks.every((task) => task.status === "done");

    return (
        <div className={styles.sliderOfProject}>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.sliderContent}>
                <div className={styles.sliderOFprojectinfo}>
                    <AddTaskForm
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        addTask={AddTask} // Pass the handler to AddTaskForm
                        tasks={tasks}
                    />
                    <div className={styles.slider}>
                        <div className={styles.projectName}>
                            <button onClick={onClose}>
                                <CloseSliderIcon />
                            </button>
                            <h1>{projectInfo.projects && projectInfo.projects[0] ? projectInfo.projects[0].title : "Loading..."}</h1>
                        </div>

                        <div className={styles.StatusContainer}>
                            <div className={styles.StatusOFproject}>
                                <label>
                                    <div className={styles.dote}></div>
                                    <p>Status:</p>
                                    <a
                                        href="#"
                                        style={{
                                            color:
                                                projectStatus === "completed"
                                                    ? '#1FAD58'
                                                    : projectStatus === "pending"
                                                        ? '#3182CE'
                                                        : '#D69E2E',
                                        }}
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
                                    data={[
                                        {
                                            value: progress,
                                            color: projectStatus === 'completed' ? '#1FAD58' : projectStatus === 'pending' ? '#3182CE' : '#D69E2E', // Green for completed, Blue for pending, Yellow for other statuses
                                        },
                                    ]}
                                    total={100}
                                    size={70}
                                    barSize={4}
                                >
                                    <p className={styles.ChartText}>{progress}</p>
                                </DonutChart>
                            </div>
                        </div>

                        <div className={styles.sliderDescription}>
                            <h1>Project Description :</h1>
                            <p>
                                {descriptionState}
                                {dotsDescription}{" "}
                                <span
                                    className={styles.seeMore}
                                    onClick={handleSeeMore}
                                >
                                    {seeAction}
                                </span>
                            </p>
                        </div>

                        {projectStatus === "pending" && (
                            <div className={styles.freeLancerList}>
                                <h1>{freelancerApplied.length} Freelancer Applied:</h1>
                                <div className={styles.freelancerApplied}>
                                    {freelancerApplied.map(({ id, freelancer }) => (
                                        <div key={id} className={styles.singleFreeLancer}>
                                            <div className={styles.freeLancerInfo}>
                                                <img src={freelancer.profilePicture} alt={`${freelancer.name}'s profile`} />
                                                <div className={styles.freeLancerText}>
                                                    <h1>{freelancer.name}</h1>
                                                </div>
                                            </div>
                                            {!isFreelancer && (
                                                <div className={styles.freeLancerAction}>
                                                    <button
                                                        onClick={() => FreelancerAction(projectId, id, "approve")}
                                                        className={styles.acceptFreeLancer}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => FreelancerAction(projectId, id, "reject")}
                                                        className={styles.declineFreeLancer}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                    ))}
                                </div>
                            </div>
                        )}
                        {projectStatus === "in-progress" && (
                            <>
                                <div className={styles.tasksSection}>
                                    <h3 className={styles.titelText}>
                                        {isFreelancer ? "My Tasks" : "Freelancer Tasks"}
                                    </h3>
                                    {!isFreelancer &&  (
                                        <button className={styles.addTaskButton} onClick={() => setIsOpen(true)}>
                                            <AddTaskIcon />
                                        </button>
                                    )}
                                    <div className={styles.taskTabs}>
                                        {["to-do", "in progress", "in-review", "done"].map((tab) => (
                                            <a
                                                key={tab}
                                                href={`#${tab.toLowerCase().replace(" ", "-")}`}
                                                className={`${styles.tab} ${selectedTab === tab ? styles.activeTab : ""}`}
                                                onClick={() => handleTabClick(tab)}
                                            >
                                                {tab}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.taskList}>
                                    {tasks.length > 0 ? (
                                        tasks
                                            .filter((task) => task.status === selectedTab)
                                            .map(({ id, name }) => (
                                                <div
                                                    key={id}
                                                    className={`${styles.task} ${!isFreelancer ? styles.withJustifyContent : ""}`}
                                                    style={{position: "relative"}}
                                                >
                                                    <SubList />
                                                    { isFreelancer &&(
                                                        <SubList />
                                                    )}
                                                    {selectedTab === "done" && isFreelancer && (
                                                        <input
                                                            type="checkbox"
                                                            id={`task-${id}`}
                                                            checked
                                                            readOnly
                                                            className={`${styles.checkbox} ${styles.checked}`}
                                                        />
                                                    )}
                                                    <div className={styles.iconContainer}>
                                                        {isFreelancer && selectedTab === "in-progress" && (
                                                            <InProgressIcon className={styles.inProgressIcon} />
                                                        )}
                                                        {isFreelancer && selectedTab === "in-review" && (
                                                            <InReviewIcon className={styles.inReviewIcon} />
                                                        )}
                                                    </div>

                                                    <p
                                                        onClick={isFreelancer && selectedTab !== "done" ? () => handleToggleSubList(id) : undefined}
                                                        className={selectedTab === "done" ? styles.doneTask : ""}
                                                    >
                                                        {name}
                                                    </p>
                                                </div>
                                            ))
                                    ) : (
                                        <p>No tasks available</p>
                                    )}
                                </div>
                                 
                                {canCompleteProject && (
                                    <button className={styles.completeBtn} onClick={() => onComplete(projectId)}>
                                        Project Complete
                                    </button>
                                )}

                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderOfProject;
