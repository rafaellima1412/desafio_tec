import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeviceForm = ({ selectedDevice, onAddDevice, onUpdateDevice }) => {
  const [device, setDevice] = useState({
    identifier: '',
    description: '',
    manufacturer: '',
    url: '',
    commands: [
      {
        operation: '',
        description: '',
        command: {
          commandUnit: '',
          parameters: [
            {
              name: '',
              description: ''
            }
          ]
        },
        result: '',
        format: ''
      }
    ]
  });

  const navigate = useNavigate();
  const { action, id } = useParams();

  useEffect(() => {
    if (selectedDevice) {
      setDevice(selectedDevice);
    }
  }, [selectedDevice]);

  const handleCommandChange = (index, e) => {
    const { name, value } = e.target;
    const newCommands = [...device.commands];
    newCommands[index][name] = value;
    setDevice({ ...device, commands: newCommands });
  };

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
      commands: [
        {
          operation: '',
          description: '',
          command: {
            commandUnit: '',
            parameters: [
              {
                name: '',
                description: ''
              }
            ]
          },
          result: '',
          format: ''
        }
      ]
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


<h3>Commands:</h3>
      {device.commands.map((command, index) => (
        <div key={index}>
          <div>
            <label htmlFor={`operation-${index}`}>Operation:</label>
            <input
              type="text"
              id={`operation-${index}`}
              name="operation"
              value={command.operation}
              onChange={(e) => handleCommandChange(index, e)}
              placeholder="Operation"
              required
            />
          </div>
          <div>
            <label htmlFor={`description-${index}`}>Description:</label>
            <input
              type="text"
              id={`description-${index}`}
              name="description"
              value={command.description}
              onChange={(e) => handleCommandChange(index, e)}
              placeholder="Description"
              required
            />
          </div>
          <div>
            <label htmlFor={`commandUnit-${index}`}>Command Unit:</label>
            <input
              type="text"
              id={`commandUnit-${index}`}
              name="commandUnit"
              value={command.command.commandUnit}
              onChange={(e) => {
                const newCommands = [...device.commands];
                newCommands[index].command.commandUnit = e.target.value;
                setDevice({ ...device, commands: newCommands });
              }}
              placeholder="Command Unit"
              required
            />
          </div>
          <div>
            <label htmlFor={`result-${index}`}>Result:</label>
            <input
              type="text"
              id={`result-${index}`}
              name="result"
              value={command.result}
              onChange={(e) => handleCommandChange(index, e)}
              placeholder="Result"
              required
            />
          </div>
          <div>
            <label htmlFor={`format-${index}`}>Format:</label>
            <input
              type="text"
              id={`format-${index}`}
              name="format"
              value={command.format}
              onChange={(e) => handleCommandChange(index, e)}
              placeholder="Format"
              required
            />
          </div>
          </div>
        ))}
      <button className="edit" type="submit">{selectedDevice ? 'Update' : 'Add'} Device</button>
      <button type="button" className="details" onClick={() => navigate('/')}>Voltar</button>
    </form>
);
};


export default DeviceForm;
