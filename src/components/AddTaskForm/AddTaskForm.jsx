import { useState } from "react";
import styles from "./AddTaskForm.module.css";

const AddTaskForm = ({ isOpen, onClose, addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [deadlineAt, setDeadlineAt] = useState(""); 
  const [notes, setNotes] = useState(""); 

  const handleAddTask = () => {
    if (!taskName || !deadlineAt || !notes) {
      alert("Please fill in all fields");
      return;
    }

    const taskData = {
      name: taskName,
      deadlineAt,
      notes,
    };

    addTask(taskData); 
    setTaskName(""); 
    setDeadlineAt("");
    setNotes("");
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div id={styles["popup-overlay"]}>
      <div className={styles["popup-content"]}>
        <div className={styles.header}>
          <h2>Add a Task</h2>
          <button onClick={onClose} className={styles["close-btn"]}>
            X
          </button>
        </div>
        <form className={styles.form}>
          <label>
            Task Name
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </label>
          <label>
            Deadline
            <input
              type="datetime-local"
              value={deadlineAt}
              onChange={(e) => setDeadlineAt(e.target.value)}
              required
            />
          </label>
          <label>
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter task notes"
              required
            />
          </label>
          <button
            type="button"
            onClick={handleAddTask}
            className={styles.addTaskBtn}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
