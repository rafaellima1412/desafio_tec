import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

const DeviceList = ({ devices, onDeleteDevice, onSelectDevice }) => {
  const navigate = useNavigate();

  const handleEditClick = (device) => {
    onSelectDevice(device);
    navigate(`/edit-device/${device.identifier}`);
  };
  return (
    <ul className="device-list">
      {devices.map((device) => (
        <li key={device.identifier} className="device-item">
          {device.description} - {device.manufacturer}
          <div className="button-group">
            <Link to={`/devices/${device.identifier}`}>
              <button type="button" className="details">Details</button>
            </Link>
            <button type="button" className="edit" onClick={() => handleEditClick(device)}>Edit</button>
            <button type="button" className="delete" onClick={() => onDeleteDevice(device.identifier)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DeviceList;
