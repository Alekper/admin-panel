import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home'
import { Routes, Route } from 'react-router-dom'
import CreateUser from './Components/CreateUser/CreateUser';
import AdminProfile from './Components/AdminProfile/AdminProfile';
import UserList from './Components/UserList/UserList';
import UploadReports from './Components/UploadReports/UploadReports';

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="new" element={<CreateUser />} />
          <Route path="list" element={<UserList />} />
          <Route path="upload-report" element={<UploadReports />} />

        </Route>
        <Route path="/" element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
