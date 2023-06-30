/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import NotComplited from './NotComplited';
import Complited from './Complited';

export default function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState('');

  useEffect(() => {
    axios.get('/tasks/getAll')
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const clickHandler = () => {
    axios.post('/tasks/newTask', { title: add })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Task added successfully');
          setTasks((prev) => [{ title: add, status: false }, ...prev]);
          setAdd('');
        }
      })
      .catch((err) => {
        toast.error(err.response.message);
      });
  };

  return (
    <div className="todobody">
      <div className="container">
        <p>
          <label htmlFor="new-task">Add Item</label>
          <input
            id="new-task"
            type="text"
            className="task"
            name="title"
            value={add}
            onChange={(e) => setAdd(e.target.value)}
          />
          <button type="submit" className="add" onClick={clickHandler} style={{ marginLeft: '7px' }}>Add</button>
        </p>

        <h3>Todo</h3>
        <section className="image image-2" />
        <section className="text" />
        <ul id="incomplete-tasks">
          {tasks.length !== 0 && tasks.map((task) => (!task.status && (
          <NotComplited
            task={task}
            setTasks={setTasks}
            key={task.id}
          />
          )))}
        </ul>
        <h3>Completed</h3>
        <ul id="completed-tasks">
          {tasks !== [] && tasks.map((task) => (task.status && (
          <Complited
            task={task}
            key={task.id}
            setTasks={setTasks}
          />
          )))}
        </ul>
      </div>
    </div>
  );
}
