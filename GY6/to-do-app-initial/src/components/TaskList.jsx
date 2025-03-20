import TaskItem from "./TaskItem";

function TaskList({ data, removeHandler, toggleTaskCompletion }) {
  // console.log(data);
  return (
    <div className="task-list">
      {data.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          removeHandler={removeHandler}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      ))}
    </div>
  );
}

export default TaskList;
