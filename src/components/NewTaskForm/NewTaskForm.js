import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

const NewTaskForm = ({ onAddTask = () => {} }) => {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTask = {
        text,
        minutes,
        seconds,
      };
      onAddTask(newTask, minutes, seconds);
      setText('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
};

export default NewTaskForm;
