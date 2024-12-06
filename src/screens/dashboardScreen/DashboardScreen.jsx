import { useEffect, useState } from "react";
// import Container from "../../components/Container/container";
import styles from "./DashboardScreen.module.css"
import Container from "../../components/Container/container";
import Card from "../../components/Card/card";
import DonutChart from "../../components/charts/DonutChart";
import CloseSliderIcon from "../../CustomIcons/CloseSliderIcon";

const DashboardScreen = () => {
    const [showSlider, setshowSlider] = useState(0);
    const [filterType, setFilterType] = useState('All');
    const projects = [
        {
            id: 1,
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 2,
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 3,
            projectName: 'ProjectName',
            projectStatus: 'completed',
            progress: 100,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 4,
            projectName: 'ProjectName',
            projectStatus: 'completed',
            progress: 100,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 5,
            projectName: 'ProjectName',
            projectStatus: 'Pending',
            progress: 0,
            user: {
                image: './avatar.png',
                name: 'Ahmed Abas'
            }
        },
        {
            id: 6,
            projectName: 'ProjectName',
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
        highRate: 82,
        midRate: 12,
        lowRate: 6
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
                                <button key={project.id} onClick={()=> setshowSlider(1)}>
                                    <div className={styles.projectInfo}>
                                        <div className={`${styles.projectData} ${project.projectStatus === 'completed'? styles.completed : project.projectStatus === 'Pending'? styles.pending: styles.inProgress}`}>
                                            <b>{project.projectName}</b>
                                            <p>{project.projectStatus}</p>
                                        </div>
                                        <DonutChart data={[{value: project.progress, color: project.projectStatus === 'completed'? '#1FAD58': '#FFBF00'}]} total={100} size={70} barSize={4}>
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
                    <div>
                        <div className={styles.statistics}>
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
                                        <DonutChart  data={[{value: 50, color: '#1FAD58'}]} total={100} size={150} barSize={10}>
                                            <DonutChart  data={[{value: 40, color: '#D69E2E'}]} total={100} size={110} barSize={10}>
                                                <DonutChart  data={[{value: 20, color: '#3C97AF'}]} total={100} size={70} barSize={10}>
                                                </DonutChart>
                                            </DonutChart>
                                        </DonutChart>
                                    </div>
                                    
                                    <div className={styles.ratingBar}>
                                        <div className={styles.barItem}>
                                            <b>High rate</b>
                                            <div className={styles.bar}>
                                                <div style={{width: `${rating.highRate}%`, backgroundColor: '#4DB251'}}></div>
                                            </div>
                                        </div>
                                        <div className={styles.barItem}>
                                            <b>Mid rate</b>
                                            <div className={styles.bar}>
                                                <div style={{width: `${rating.midRate}%`, backgroundColor: '#FFBF00'}}></div>
                                            </div>
                                        </div>
                                        <div className={styles.barItem}>
                                            <b>low rate</b>
                                            <div className={styles.bar}>
                                                <div style={{width: `${rating.lowRate}%`, backgroundColor: '#E4636F'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                    </div>
                </div>
            </Container>
            <div className={styles.sliderOFprojectinfo} style={{display : showSlider === 1 ? "flex" : "none"}}>
                <div className={styles.slider}>
                            <div className={styles.projectName}>
                                <button onClick={()=>setshowSlider(0)}><CloseSliderIcon/></button>
                                <h1>Project Name</h1>
                            </div>
                            <div className={styles.StatusOFproject}>
                                <label>
                                    <div className={styles.dote}></div>
                                    <p> Status :</p>
                                    <a href="">Pending</a>
                                </label>
                                <label>
                                    <div className={styles.dote}></div>
                                    <p>  Timeline :</p>
                                    <span>2 months</span>
                                </label>
                            </div>
                            <div className={styles.sliderDescription}>
                                <h1>Project Description :</h1>
                                <p>Develop an app for daily task management ..... <button>see more</button></p>
                            </div>
                            <div className={styles.freeLancerList}>
                                  <h1>{freelancerApplied.length} Freelancer Applied:</h1>
                            </div>
                            <div className={styles.freelancerApplied}>
                                {freelancerApplied.map((p)=>(
                                   <div className={styles.singleFreeLancer}>
                                         <div className={styles.freeLancerInfo}>
                                            <img src={p.imag} alt="" />
                                            <div className={styles.freeLancerText}>
                                                <h1>{p.name}</h1>
                                                <p>{p.type}</p>
                                            </div>
                                         </div>
                                         <div className={styles.freeLancerAction}>
                                                <button  onClick={() => removeFreelancerById(p.id)} className={styles.acceptFreeLancer}>Accept</button>
                                                <button  onClick={() => removeFreelancerById(p.id)} className={styles.declineFreeLancer}>Decline</button>
                                          </div>
                                   </div>
                                ))}
                            </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardScreen;