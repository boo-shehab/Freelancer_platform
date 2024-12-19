
import InProgressIcon from '../../CustomIcons/InProgressIcon';
import InReviewIcon from '../../CustomIcons/InReviewIcon';
import ToDoIcon from '../../CustomIcons/ToDoIcon';
import DoneTaskIcon from '../../CustomIcons/DoneTaskIcon';
import styles from './SliderOfProject.module.css';

const clientSublist = ({ taskId, onStatusChange }) => (
    <div className={styles.subList}>
        <ul className={styles.subListItems}>
           
            <li onClick={() => onStatusChange(taskId, "approve-task")}>
                <DoneTaskIcon /> Accept
            </li>
            <li onClick={() => onStatusChange(taskId, "reject-task")}>
                <DoneTaskIcon /> Reject
            </li>
        </ul>
    </div>
);

export default clientSublist;
