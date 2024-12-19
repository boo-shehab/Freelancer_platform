import { useEffect, useState } from "react";
// import Container from "../../components/Container/container";
import styles from "./DashboardScreen.module.css";
import Container from "../../components/Container/container";
import Card from "../../components/Card/card";
import DonutChart from "../../components/charts/DonutChart";
import SliderOfProject from "../../components/SliderOfProject/SliderOfProject";
import FetchData from "../../utility/fetchData";
import useUserinfoStore from "../../useUserinfoStore";


const DashboardScreen = () => {
  const [showSlider, setShowSlider] = useState(0); // Correct casing for `setShowSlider`
  const [filterType, setFilterType] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [statistics, setStatistics] = useState({})
  const [project, setProject] = useState([]);
  const { isFreelancer } = useUserinfoStore()
  const profilePicture = useUserinfoStore((state) => state.profilePicture);
  const name = useUserinfoStore((state) => state.name);
  const [projectInfo, setProjectInfo] = useState([]);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Design Registration Screen", status: "To Do" },
    { id: 2, name: "Design Registration Screen", status: "To Do" },
    { id: 3, name: "Design Registration Screen", status: "To Do" },
    { id: 4, name: "Design Registration Screen", status: "In Progress" },
    { id: 5, name: "Design Registration Screen", status: "In Progress" },
    { id: 6, name: "Design Registration Screen", status: "In Progress" },
    { id: 7, name: "Design Registration Screen", status: "In Review" },
    { id: 8, name: "Design Registration Screen", status: "In Review" },
    { id: 9, name: "Design Registration Screen", status: "In Review" },
    { id: 10, name: "Design Registration Screen", status: "Done" },
    { id: 11, name: "Design Registration Screen", status: "Done" },
    { id: 12, name: "Design Registration Screen", status: "Done" },
  ]);

  // const [projects, setProjects] = useState([
  //   {
  //     id: 1,
  //     projectName: "ProjectName 1",
  //     projectStatus: "In Progress",
  //     progress: 50,
  //     user: {
  //       image: "./avatar.png",
  //       name: "Ahmed Abas",
  //     },
  //   },
  //   {
  //     id: 2,
  //     projectName: "ProjectName 2",
  //     projectStatus: "In Progress",
  //     progress: 50,
  //     user: {
  //       image: "./avatar.png",
  //       name: "Ahmed Abas",
  //     },
  //   },
  //   {
  //     id: 3,
  //     projectName: "ProjectName 3",
  //     projectStatus: "Completed",
  //     progress: 100,
  //     user: {
  //       image: "./avatar.png",
  //       name: "Ahmed Abas",
  //     },
  //   },
  //   {
  //     id: 4,
  //     projectName: "ProjectName 4",
  //     projectStatus: "Completed",
  //     progress: 100,
  //     user: {
  //       image: "./avatar.png",
  //       name: "Ahmed Abas",
  //     },
  //   },
  //   {
  //     id: 5,
  //     projectName: "ProjectName 5",
  //     projectStatus: "Pending",
  //     progress: 0,
  //     user: {
  //       image: "./avatar.png",
  //       name: "Ahmed Abas",
  //     },
  //   },
  //   {
  //     id: 6,
  //     projectName: "ProjectName 6",
  //     projectStatus: "Pending",
  //     progress: 0,
  //     user: {
  //       image: "./avatar.png",
  //       name: "Ahmed Abas",
  //     },
  //   }
  // ]);

  // const rating = {
  //   starRate: "4.0",
  //   highRate: 53,
  //   midRate: 12,
  //   lowRate: 35,
  // };

  const getStatistics = async () => {
    try {
      const data = await FetchData(`profiles/statistics`, {
        method: 'GET',
      })
      if (data.isSuccess) {
        setStatistics(data.results);
      } else {
        console.error("Failed to fetch statistics");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getStatistics();

  }, []);

  const getProject = async () => {
    try {
      const status = filterType !== "All" ? filterType : "";
      const data = await FetchData(`profiles/projects?status=${status}&page=0&pageSize=100`, {
        method: 'GET',
      });
      if (data.isSuccess) {
        setProject(data.results.result || []);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, [filterType]);

  useEffect(() => { }, [filterType]);


  const handleProjectClick = (projectId) => {
    const selected = project.find((p) => p.id === projectId);
    setSelectedProject(selected);
    setShowSlider(1); // Open the slider
  };


  // const handleEdit = (taskId) => {
  //   const taskName = prompt("Edit Task Name:");
  //   if (taskName) {
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === taskId ? { ...task, name: taskName } : task
  //       )
  //     );
  //   }
  // };

  // const handleDelete = (taskId) => {
  //   if (window.confirm("Are you sure you want to delete this task?")) {
  //     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  //   }
  // };
  // const handleTaskStatusChange = (taskId, newStatus) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) =>
  //       task.id === taskId ? { ...task, status: newStatus } : task
  //     )
  //   );
  // };

  // const handleCompleteProject = (projectId) => {
  //   setProjects((prevProjects) =>
  //     prevProjects.map((project) =>
  //       project.result.id === projectId
  //         ? { ...project, projectStatus: "Completed", progress: 100 }
  //         : project
  //     )
  //   );
  // };
  const filters = ["All", "pending", "in-progress", "completed"];

  return (
    <div className={styles.dashboardContainer}>
      <Container>
        <div className={styles.content}>
          <section className={styles.section1}>
            <div className={styles.projectsHeader}>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterType(filter)}
                  className={filterType === filter ? styles.active : ""}
                  aria-pressed={filterType === filter}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
            <div className={styles.projects}>
              {Array.isArray(project) &&
                project.map((p) => (
                  <button
                    className={styles.projectBtn}
                    key={p.id}
                    onClick={() => handleProjectClick(p.id)}
                  >
                    <div className={styles.projectInfo}>
                      <div
                        className={`${styles.projectData} ${p.status === "completed"
                          ? styles.completed
                          : p.status === "pending"
                            ? styles.pending
                            : styles.inProgress
                          }`}
                      >
                        <b>{p.title}</b>
                        <p>{p.status}</p>
                      </div>
                      <DonutChart
                        data={[
                          {
                            value: isNaN(parseFloat(p.percentage)) ? 0 : parseFloat(p.percentage),
                            color: p.status === "completed" ? "#1FAD58" : "#FFBF00",
                          },
                        ]}
                        total={100}
                        size={71}
                        barSize={4}
                      >
                        <p className={styles.ChartText}>
                          {isNaN(parseFloat(p.percentage)) ? "0%" : p.percentage}
                        </p>
                      </DonutChart>
                    </div>
                    <div className={styles.projectUserInfo}>
                      <img src={profilePicture} alt={name || 'User'} />
                      <p>{name || 'Unknown User'}</p>
                    </div>
                  </button>
                ))}
            </div>

          </section>
          <div className={styles.section2}>
            {" "}
            <div className={styles.statistics}>
              <div className={styles.card}>
                <p>Total Projects</p>
                <b>{statistics?.projects?.total ?? 0}</b>
              </div>
              <div className={styles.card}>
                <p>Pending</p>
                <b>{statistics?.projects?.pending ?? 0}</b>
              </div>

              <div className={styles.card}>
                <p>In Progress</p>
                <b>{statistics?.projects?.inProgrss ?? 0}</b>
              </div>
              <div className={styles.card}>
                <p>Done</p>
                <b>{statistics?.projects?.completed ?? 0}</b>
              </div>
            </div>
            <Card marginTop={12}>
              <div className={styles.statisticsSection}>
                <div className={styles.totalDonutChart}>
                  <h2>Total Tasks - <span>{statistics?.tasks?.total ?? 0}</span></h2>
                  <DonutChart
                    data={[{ value: 50, color: "#1FAD58" }]}
                    total={100}
                    size={150}
                    barSize={10}
                    deg={-180}
                  >
                    <DonutChart
                      data={[{ value: 40, color: "#D69E2E" }]}
                      total={100}
                      size={110}
                      barSize={10}
                      deg={-90}
                    >
                      <DonutChart
                        data={[{ value: 20, color: "#3C97AF" }]}
                        total={100}
                        size={70}
                        barSize={10}
                        deg={0}
                      ></DonutChart>
                    </DonutChart>
                  </DonutChart>
                </div>

                <div className={styles.ratingBar}>
                  <div className={styles.barItem}>
                    <b>To Do <span>{statistics?.tasks?.toDo}</span></b>
                    <div className={styles.bar}>
                      <div
                        style={{
                          width: `${statistics?.tasks?.toDo}`,
                          backgroundColor: "#3C97AF",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.barItem}>
                    <b>In Progress <span>{statistics?.tasks?.inProgress}</span></b>
                    <div className={styles.bar}>
                      <div
                        style={{
                          width: `${statistics?.tasks?.inProgress}`,
                          backgroundColor: "#D69E2E",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.barItem}>
                    <b>Done <span>{statistics?.tasks?.done}</span></b>
                    <div className={styles.bar}>
                      <div
                        style={{
                          width: `${statistics?.tasks?.done}`,
                          backgroundColor: "#1FAD58",
                        }}
                      ></div>
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
        onClose={() => setShowSlider(0)}
        projectData={selectedProject ? { projectId: selectedProject.id, progress: selectedProject.percentage, projectStatus: selectedProject.status } : null}
      />


    </div>
  );
};

export default DashboardScreen;
