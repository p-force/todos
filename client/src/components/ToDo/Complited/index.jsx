/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Complited({ task, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [ckeck, setCkeck] = useState(task.status);

  const handleCheckboxChange = () => {
    setCkeck(!ckeck);
    axios.put(`/tasks/updateTask/${task.id}`, { status: !ckeck })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Task updated successfully');
          setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: !ckeck } : t)));
        }
      })
      .catch((err) => {
        toast.error(err.response);
      });
  };

  const handleDeleteClick = () => {
    axios.delete(`/tasks/deleteTask/${task.id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Task deleted successfully');
          setTasks((prev) => prev.filter((t) => t.id !== task.id));
        }
      })
      .catch((err) => {
        toast.error(err.response);
      });
  };

  const handleSaveButtonClick = () => {
    if (title === '') {
      toast.error('Title cannot be empty');
      setTitle(task.title);
      return;
    }
    setIsEditing(!isEditing);
    axios.put(`/tasks/updateTask/${task.id}`, { title })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Task updated successfully');
          setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, title } : t)));
        }
      })
      .catch((err) => {
        toast.error(err.response.message);
      });
  };

  return (
    <li>
      <input type="checkbox" checked={ckeck} onChange={handleCheckboxChange} />
      {isEditing ? (
        <>
          <input type="text" name="edit" style={{ display: 'revert' }} className="form-control task" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button type="submit" className="edit" onClick={handleSaveButtonClick}>
            Save
          </button>
        </>
      ) : (
        <>
          <label>{task.title}</label>
          <button type="submit" className="edit" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </button>
        </>
      )}
      <button
        type="submit"
        className="delete"
        id={`delete${task.id}`}
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </li>
  );
}
