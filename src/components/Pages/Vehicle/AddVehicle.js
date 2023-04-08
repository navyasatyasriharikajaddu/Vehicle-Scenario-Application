import React, { useState, useEffect } from 'react';
import styles from './AddVehicle.module.css';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';
import axios from 'axios';
import Button from '../../UI/Button';

const AddVehicle = () => {

  const [list, setList] = useState([]);
  /* setting values for getting input from user*/
  const [scenario, setScenario] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [speed, setSpeed] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [direction, setDirection] = useState('');
  const [error, setError] = useState(false);

  const history = useHistory();
  const restHandler = () => {
    setScenario('');
    setVehicle('');
    setSpeed('');
    setPositionX('');
    setPositionY('');
    setDirection('');

  };

  useEffect(() => {
    
    axios
      .get('http://localhost:3006/scenario')
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addVehicleHandler = (e) => {
    e.preventDefault();

    
    /*condition check */
    if (
      scenario.length === 0 ||
      vehicle.length === 0 ||
      positionX.length === 0 ||
      positionY.length === 0 ||
      speed.length === 0 ||
      direction.length === 0
    ) {
      setError(true);
      // console.log('fill all fields')
    } else {
      const vehicleDetails = {
        id: v4(),
        scenario: scenario,
        vehicle_name: vehicle,
        initial_position_X: positionX,
        initial_position_Y: positionY,
        speed: speed,
        direction: direction,
      };

      /*post request */
      axios
        .post(`http://localhost:3006/vehicles`, vehicleDetails)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
      setError(false);
      alert('Added successfully');
      history.replace('/');
    }
  };
  return (
    <>
      <p>Vehicle / add</p>
      <form className={styles.vform} onSubmit={addVehicleHandler}>
        <br />
        <h1>Add Vehicle</h1>
        <div className={styles.main}>
          <div className="input-container">
            <label htmlFor="s-list">Scenarios List</label>
            <br />
            <select
              style={{
                width: '275px',
                height: '50px',
                border: '1px solid gray',
                backgroundColor: 'black',
                color: 'aliceblue',
                borderRadius: '10px',
                padding: '3px',
              }}
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            >
              {' '}
              <option>Select Scenario</option>
              {list.map((item, id) => (
                <option key={id}>{item.scenario_name}</option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="name">Vehicle Name</label>
            <br />
            <input
              type="text"
              placeholder="Vehicle Name"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              required
            />
            {error && vehicle.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
          <div className="input-container">
            <label htmlFor="speed">Speed</label>
            <br />
            <input
              type="text"
              placeholder="Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              required
            />
            {error && speed.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>

          <div className="input-container">
            <label htmlFor="posX">Position X</label>
            <br />
            <input
              type="number"
              placeholder="10"
              value={positionX}
              onChange={(e) => setPositionX(e.target.value)}
              required
              min="0"
              max="50"
            />
            {error && positionX.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
          <div className="input-container">
            <label htmlFor="posY">Position Y</label>
            <br />
            <input
              type="text"
              placeholder="20"
              value={positionY}
              onChange={(e) => setPositionY(e.target.value)}
              required
            />
            {error && positionY.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
          <div className="input-container">
            <label htmlFor="direction">Direction</label>
            <br />
            <select
              style={{
                width: '275px',
                height: '50px',
                border: '1px solid gray',
                backgroundColor: 'black',
                color: 'aliceblue',
                borderRadius: '10px',
                padding: '3px',
              }}
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option>Select Direction</option>
              <option>Towards</option>
              <option>Upwards</option>
              <option>Downwards</option>
              <option>Backwards</option>
            </select>
            {error && direction.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
        </div>{' '}
        <br />
        <div className='btn-primary'>
        <Button to="#" backgroundColor="#1bd27c" onClick={addVehicleHandler}>
          Add
        </Button>
        <Button to="#" backgroundColor="orange" onClick={restHandler}>
          Reset
        </Button>
        <Button to="/" backgroundColor="skyblue">
          Go Back
        </Button>
        </div>
      </form>
    </>
  );
};

export default AddVehicle;
