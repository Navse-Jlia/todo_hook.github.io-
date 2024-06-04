import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({
  task = {},
  className = '',
  onDelete = () => {},
  onTaskCompleted = () => {},
  clickOnInput = () => {},
  onEditTask = () => {},
  startTimer = () => {},
  pauseTimer = () => {},
}) => {
  const [editing, setEditing] = useState(false);
  const [editingTaskText, setEditingTaskText] = useState(task.text);
  const [currentTime, setCurrentTime] = useState(task.currentTime);

  useEffect(() => {
    setCurrentTime(task.currentTime);
  }, [task.currentTime]);

  const handleStartTimer = () => {
    startTimer(task.id);
  };

  const handlePauseTimer = () => {
    pauseTimer();
  };

  const handleEdit = () => {
    setEditing(true);
    setEditingTaskText(task.text);
  };

  const handleInputChange = (e) => {
    setEditingTaskText(e.target.value);
  };

  const handleSave = () => {
    if (editingTaskText.trim() !== '') {
      onEditTask(task.id, editingTaskText);
      setEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const liClassName = `${className ? `${className} ` : ''}${
    task.completed ? 'completed' : ''
  }${editing ? ' editing' : ''}`;

  return (
    <li className={liClassName}>
      <div className="view">
        {!editing ? (
          <>
            <input
              className="toggle"
              type="checkbox"
              onClick={() => clickOnInput(task.id)}
              defaultChecked={task.completed}
            />
            <label>
              <span className="description title">{task.text}</span>
              <span className="description control-timer">
                <button
                  className="icon icon-play"
                  onClick={handleStartTimer}
                ></button>
                <button
                  className="icon icon-pause"
                  onClick={handlePauseTimer}
                ></button>
                <span>
                  {`${Math.floor(currentTime / 60)}:${
                    currentTime % 60 < 10 ? '0' : ''
                  }${currentTime % 60}`}
                </span>
              </span>
              <span className="description">
                {formatDistanceToNow(new Date(task.createdAt))}
              </span>
            </label>
            <button className="icon icon-edit" onClick={handleEdit} />
            <button className="icon icon-destroy" onClick={onDelete} />
          </>
        ) : (
          <input
            className="edit"
            type="text"
            value={editingTaskText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        )}
      </div>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  className: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onTaskCompleted: PropTypes.func.isRequired,
  clickOnInput: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  startTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
};

export default Task;
