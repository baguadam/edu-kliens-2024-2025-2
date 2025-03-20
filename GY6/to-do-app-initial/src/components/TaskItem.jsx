function TaskItem({ task, removeHandler, toggleTaskCompletion }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        onChange={() => toggleTaskCompletion(task.id)}
        type="checkbox"
        checked={task.completed}
      />
      <span>{task.title}</span>
      <button onClick={() => removeHandler(task.id)}>✕</button>
    </div>
  );
}

export default TaskItem;
