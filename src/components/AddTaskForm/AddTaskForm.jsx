import { useState } from "react";
import styles from "./AddTaskForm.module.css";

const AddTaskForm = ({ isOpen, onClose, addTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    if (!taskName) {
      alert("Please enter a task name");
      return;
    }

    addTask(taskName, "To Do"); // Adds the task with the default status "To Do"
    setTaskName(""); // Clear the input field
    onClose(); // Close the popup
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
        <div className={styles.form}>
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
          <button
            type="button"
            onClick={handleAddTask}
            className={styles.addTaskBtn}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
