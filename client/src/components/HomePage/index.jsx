import React from 'react';
import Navbar from '../Navbar';
import './style.css';
import ToDo from '../ToDo';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <ToDo />
    </>
  );
}
