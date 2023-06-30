import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({
  forAuthUser, redirectTo,
}) {
  const user = localStorage.getItem('user');
  if (forAuthUser !== !!user) {
    return (<Navigate replace to={redirectTo} />);
  }
  return <Outlet />;
}

export default ProtectedRoute;
