import React, { useRef, useState, useEffect } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import { createRoot } from 'react-dom/client';
import './App.css';

import catIcon from './cat.png';

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Check mail',
      completed: false,
      editing: false,
      isRunning: false,
      currentTime: 0,
      createdAt: new Date(),
    },
    {
      id: 2,
      text: 'Drink coffee',
      completed: false,
      editing: false,
      isRunning: false,
      currentTime: 0,
      createdAt: new Date(),
    },
    {
      id: 3,
      text: 'Buy a cake',
      completed: false,
      editing: false,
      isRunning: false,
      currentTime: 0,
      createdAt: new Date(),
    },
  ]);
  const [filter, setFilter] = useState('all');

  const timers = useRef({});

  useEffect(() => {
    return () => {
      // Очистка всех таймеров при размонтировании компонента
      Object.values(timers.current).forEach(clearInterval);
    };
  }, []);

  const handleTaskCompleted = (id, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const handleAddTask = (newTask, minutes, seconds) => {
    const createdTask = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      currentTime: parseInt(minutes, 10) * 60 + parseInt(seconds, 10),
      completed: false,
      editing: false,
      isRunning: false,
    };
    setTasks((prevTasks) => [...prevTasks, createdTask]);
  };

  const startTimer = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isRunning: true };
        }
        return task;
      })
    );

    timers.current[taskId] = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId && task.currentTime > 0) {
            return { ...task, currentTime: task.currentTime - 1 };
          } else if (task.id === taskId && task.currentTime === 0) {
            clearInterval(timers.current[taskId]);
            delete timers.current[taskId];
            return { ...task, isRunning: false };
          }
          return task;
        })
      );
    }, 1000);
  };

  const pauseTimer = (taskId) => {
    clearInterval(timers.current[taskId]);
    delete timers.current[taskId];
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isRunning: false };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (id) => {
    clearInterval(timers.current[id]);
    delete timers.current[id];
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleClearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const handleFilterTasks = (filter) => {
    setFilter(filter);
  };

  const filterTasks = (tasks, filter) => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    } else {
      return tasks;
    }
  };

  const clickOnInput = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const countIncompleteTasks = () => {
    return tasks.filter((task) => !task.completed).length;
  };

  const handleEditTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const filteredTasks = filterTasks(tasks, filter);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>
          todo app <img src={catIcon} alt="Kitty Icon" width="50" height="50" />{' '}
          {/* Иконка котика */}
        </h1>
        <NewTaskForm onAddTask={handleAddTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleteTask={handleDeleteTask}
          onTaskCompleted={handleTaskCompleted}
          clickOnInput={clickOnInput}
          onEditTask={handleEditTask}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
        />
        <Footer
          filter={filter}
          onClearCompletedTasks={handleClearCompletedTasks}
          onFilterTasks={handleFilterTasks}
          countIncompleteTasks={countIncompleteTasks}
        />
      </section>
    </section>
  );
};

export default App;
