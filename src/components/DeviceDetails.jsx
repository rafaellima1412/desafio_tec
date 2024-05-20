import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeviceDetails = ({ devices }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const device = devices.find((device) => device.identifier === id);

  if (!device) {
    return <div>Device not found</div>;
  }

  return (
    <div className="device-details">
      <h2>Device Details</h2>
      <ul>
        <li><strong>Identifier:</strong> {device.identifier}</li>
        <li><strong>Description:</strong> {device.description}</li>
        <li><strong>Manufacturer:</strong> {device.manufacturer}</li>
        <li><strong>URL:</strong> {device.url}</li>
        <li><strong>Commands:</strong>
          <ul>
            {device.commands.map((command, index) => (
              <li key={index}>
                <strong>Operation:</strong> {command.operation} <br />
                <strong>Description:</strong> {command.description} <br />
                <strong>Command:</strong> {command.command.commandUnit} <br />
                <strong>Parameters:</strong>
                <ul>
                  {command.command.parameters.map((param, i) => (
                    <li key={i}>
                      <strong>Name:</strong> {param.name} <br />
                      <strong>Description:</strong> {param.description}
                    </li>
                  ))}
                </ul>
                <strong>Result:</strong> {command.result} <br />
                <strong>Format:</strong> {command.format}
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <button className="details" onClick={() => navigate('/')}>Voltar</button>
    </div>
  );
};

export default DeviceDetails;
