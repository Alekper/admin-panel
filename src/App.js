import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import CreateUser from './Components/CreateUser/CreateUser';
import AdminProfile from './Components/AdminProfile/AdminProfile';
import UserList from './Components/UserList/UserList';
import UploadReports from './Components/UploadReports/UploadReports';
import { useEffect, useCallback } from 'react'
import React from 'react';

function AuthorizedPage({ render }) {
  const navigate = useNavigate()
  const isAuthorized = !!localStorage.getItem('username')
  useEffect(() => {
    if (!isAuthorized)
      navigate('/login')
  }, [isAuthorized, navigate])

  if (!isAuthorized)
    return null

  return render()
}

function App() {

  const renderProfile = useCallback(() => (<AdminProfile />), [])
  const renderNewUser = useCallback(() => (<CreateUser />), [])
  const renderList = useCallback(() => (<UserList />), [])
  const renderReport = useCallback(() => (<UploadReports />), [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="profile" element={<AuthorizedPage render={renderProfile} />} />
          <Route path="new" element={<AuthorizedPage render={renderNewUser} />} />
          <Route path="list" element={<AuthorizedPage render={renderList} />} />
          <Route path="upload-report" element={<AuthorizedPage render={renderReport} />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to='/' />} />


      </Routes>
    </div>
  );
}

export default App;
