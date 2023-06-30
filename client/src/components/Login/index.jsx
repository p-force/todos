/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.email === '' || input.password === '') {
      toast.warning('Please fill in all fields');
      return;
    }
    axios.post('/auth/login', input)
      .then((res) => {
        if (res.data.message) {
          toast.warning('Please confirm your email');
          return;
        }
        toast.success('Successfully logged in');
        const token = res.data.accessToken;
        localStorage.setItem('Bearer ', token);
        Cookies.set('accessToken', res.data.accessToken);
        Cookies.set('refreshToken', res.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.data.userFront));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => navigate('/home'));
  };

  return (
    <div className="form-box ">
      <div className="form-value">
        <form noValidate onSubmit={submitHandler}>
          <h2>SIGN IN</h2>
          <div className="inputbox">
            <ion-icon name="mail-outline" />
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
            <ion-icon name="lock-closed-outline" />
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeHandler}
              required
            />
            <label htmlFor="">Password</label>
          </div>
          {/* <div className="forget">
            <label htmlFor="">
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#restore" onClick={forgotModalClick}>Forgot Password</a>
          </div> */}
          <button className="button" type="submit">sign in</button>
          <div className="register">
            <p> Don`t have an account?</p>
            <p><Link to="/register">sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
