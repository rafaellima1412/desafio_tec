import './styles/EstiloForm.css';
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import DeviceForm from './components/DeviceForm';
import DeviceList from './components/DeviceList';
import DeviceDetails from './components/DeviceDetails';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchDevices();
    }
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get('/device');
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    fetchDevices();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const addDevice = async (device) => {
    try {
      await axios.post('/device', device);
      fetchDevices();
    } catch (error) {
      console.error('Error adding device:', error);
    }
  };

  const updateDevice = async (id, device) => {
    try {
      await axios.put(`/device/${id}`, device);
      fetchDevices();
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  const deleteDevice = async (id) => {
    try {
      await axios.delete(`/device/${id}`);
      fetchDevices();
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  // const handleEditDevice = (device) => {
  //   setSelectedDevice(device);
  // };

  return (
    <Router>
      <div>
        <h1>Device Manager</h1>
        {isAuthenticated ? (
          <>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <Link to="/add-device">
              <button className="edit">Add Device</button>
            </Link>
            <Routes>
              <Route path="/" element={
                <>
                  <DeviceList
                    devices={devices}
                    onDeleteDevice={deleteDevice}
                    onSelectDevice={setSelectedDevice}
                  />
                </>
              } />
               <Route path="/devices/:id" element={<DeviceDetails devices={devices} />} />
              <Route path="/add-device" element={
                <DeviceForm
                  selectedDevice={null}
                  onAddDevice={addDevice}
                  onUpdateDevice={updateDevice}
                />
              } />
              <Route path="/edit-device/:id" element={
                <DeviceForm
                  selectedDevice={selectedDevice}
                  onAddDevice={addDevice}
                  onUpdateDevice={updateDevice}
                />
              } />
             
            </Routes>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
};

export default App;
