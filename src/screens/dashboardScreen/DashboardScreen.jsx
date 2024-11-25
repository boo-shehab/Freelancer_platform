import { useEffect, useState } from "react";
import styles from "./DashboardScreen.module.css"
const DashboardScreen = () => {
    const [filterType, setFilterType] = useState('All');
    const projects = [
        {
            projectName: 'ProjectName',
            projectStatus: 'In Progress',
            progress: 50
        }
    ]
    useEffect(() => {

    }, [filterType])
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.content}>
                <div className={styles.projectsContainer}>
                    <div className={styles.projectsHeader}>
                    <button onClick={setFilterType('All')}>All</button>
                    <button>Pending</button>
                    <button>InProgress</button>
                    <button>Completed</button>
                    </div>
                </div>
                <div style={{backgroundColor: 'green'}}>
                    right
                </div>
            </div>
        </div>
    )
}

export default DashboardScreen;