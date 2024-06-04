import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({
  tasks = [],
  onDeleteTask = () => {},
  onTaskCompleted = () => {},
  clickOnInput = () => {},
  onEditTask = () => {},
  startTimer = () => {},
  pauseTimer = () => {},
}) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={() => onDeleteTask(task.id)}
          onTaskCompleted={onTaskCompleted}
          clickOnInput={clickOnInput}
          onEditTask={onEditTask}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
        />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onTaskCompleted: PropTypes.func.isRequired,
  clickOnInput: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  startTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
};

export default TaskList;
