import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceForm = ({ selectedDevice, onAddDevice, onUpdateDevice }) => {
  const [device, setDevice] = useState({
    identifier: '',
    description: '',
    manufacturer: '',
    url: '',
    commands: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDevice) {
      setDevice(selectedDevice);
    } else {
      setDevice({
        identifier: '',
        description: '',
        manufacturer: '',
        url: '',
        commands: [],
      });
    }
  }, [selectedDevice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDevice) {
      onUpdateDevice(selectedDevice.identifier, device);
    } else {
      onAddDevice(device);
    }
    setDevice({
      identifier: '',
      description: '',
      manufacturer: '',
      url: '',
      commands: [],
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="identifier">Identifier:</label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          value={device.identifier}
          onChange={handleChange}
          placeholder="Identifier"
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={device.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
      </div>
      <div>
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input
          type="text"
          id="manufacturer"
          name="manufacturer"
          value={device.manufacturer}
          onChange={handleChange}
          placeholder="Manufacturer"
          required
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={device.url}
          onChange={handleChange}
          placeholder="URL"
          required
        />
      </div>
      <button className="edit" type="submit">{selectedDevice ? 'Update' : 'Add'} Device</button>
      <button type="button" className="details" onClick={() => navigate('/')}>Voltar</button>
    </form>
);
};


export default DeviceForm;
