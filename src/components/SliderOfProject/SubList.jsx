
import InProgressIcon from '../../CustomIcons/InProgressIcon';
import InReviewIcon from '../../CustomIcons/InReviewIcon';
import ToDoIcon from '../../CustomIcons/ToDoIcon';
import DoneTaskIcon from '../../CustomIcons/DoneTaskIcon';
import styles from './SliderOfProject.module.css';

const SubList = ({ taskId, onStatusChange }) => (
    <div className={styles.subList}>
        <ul className={styles.subListItems}>
            <li onClick={() => onStatusChange(taskId, "To Do")}>
                <ToDoIcon /> To Do
            </li>
            <li onClick={() => onStatusChange(taskId, "start-task")}>
                <InProgressIcon /> In Progress
            </li>
            <li onClick={() => onStatusChange(taskId, "submit-task")}>
                <InReviewIcon /> In Review
            </li>
            {/* <li onClick={() => onStatusChange(taskId, "approve-task")}>
                <DoneTaskIcon /> Done
            </li> */}
        </ul>
    </div>
);

export default SubList;
