/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalForm from '../ModalForm';

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState({ email: '', password: '' });
  const [confirmInput, setConfirmInput] = useState('');
  const [error, setError] = useState({ status: false, message: '' });

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (input.password === '' && confirmInput === '') {
      setError({ status: false, message: '' });
    } else if (input.password !== confirmInput) {
      setError({ status: true, message: 'Password mismatch' });
    } else {
      setError({ status: false, message: 'Correct password' });
    }
  }, [confirmInput, input.password]);

  const handleOpen = () => setOpen(true);

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.email === '' || input.password === '' || confirmInput === '') {
      toast.warning('Please fill in all fields');
      return;
    }
    axios.post('/auth/register', input)
      .then(() => {
        toast.success('Account created successfully');
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="form-box">
        <div className="form-value ">
          <form noValidate onSubmit={submitHandler}>
            <h2>sign up</h2>
            <div className="inputbox">
              <input
                type="text"
                name="email"
                value={input.email}
                onChange={changeHandler}
                required
              />
              <label htmlFor="inputField">
                Email
              </label>
            </div>
            <div className="inputbox">
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={changeHandler}
                required
              />
              <label htmlFor="">Password</label>
            </div>
            <div className="inputbox">
              <input
                type="password"
                name="cpassword"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                required
              />
              <label htmlFor="">Confirm password</label>
            </div>
            {error.status && (<div className="error" style={{ color: '#d86161' }}><p>{error.message}</p></div>)}
            <button className="button" type="submit">sign up</button>
            <div className="register">
              <p> I have an account!</p>
              <p><Link to="/login">sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
      {open && (
      <ModalForm setOpen={setOpen} open={open} />
      )}
    </>
  );
}
