import React, { useEffect, useState } from 'react';
import './Scenario.css';
import Button from '../../UI/Button';
import useFetch from '../../customHook/useFetch';
import { Link } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import axios from 'axios';
import { AiFillEdit, AiFillDelete, AiFillPlusCircle } from 'react-icons/ai';
import { color } from 'framer-motion';

const Scenario = () => {
  const [tableData, setTableData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [flashMsg, setFlashMsg] = useState(false);

  const [vehicles] = useFetch('http://localhost:3006/vehicles');
  // console.log(vehicles);

  useEffect(() => {
    // const tableData = [];

    data.forEach((scenario) => {
      const matchingVehicles = vehicles.filter(
        (vehicle) => vehicle.scenario === scenario.scenario_name
      );

      tableData.push({
        id: scenario.id,
        scenario_name: scenario.scenario_name,
        num_vehicles: matchingVehicles.length,
        speed: scenario.scenario_time,
      });
    });

    setTableData(tableData);
    // console.log(tableData);
  }, [data, vehicles]);

  const fetchData = async () => {
    const resp = await fetch(`http://localhost:3006/scenario`);
    const data = await resp.json();
    // console.log(data);
    setData(data);
  };
  useEffect(() => {
    fetchData();
  }, [update]);

  const [vdata] = useFetch('http://localhost:3006/vehicles');
  // console.log(vdata)

  const deleteHandler = async (id, name) => {
    try {
      const uname = name.replace(/ /g, '%20');
      // console.log(id, uname);
      const res = await axios.get(
        `http://localhost:3006/vehicles?scenario=${uname}`
      );
      console.log(res.data);
      for (const item of Object.entries(res.data)) {
        // console.log(item[1].id);
        const vid = item[1].id;
        await axios.delete(`http://localhost:3006/vehicles/${vid}`);
        // console.log(`Vehicle ${vid} deleted.`);
      }
      deleteScenario(id);
      setUpdate(!update);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteScenario = (id) => {
    axios
      .delete(`http://localhost:3006/scenario/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUpdate(!update);
  };

  const deleteAllHandler = () => {
    setFlashMsg(true);
  };
  return (
    <section>
      <div className="header">
        <h1>All Scenarios</h1>
        {flashMsg && (
            <FlashMessage duration={3000} persistOnHover={true}>
              <p style={{color:'azure', fontSize:'20px'}}>Please delete from the table below.</p>
            </FlashMessage>
          )}
        <div className="btn">
      
          <Button to="/add-scenario" backgroundColor="skyblue">
            New Scenario
          </Button>
          <Button to="/add-vehicle" backgroundColor="#1bd27c">
            Add Vehicle
          </Button>
          <Button to="#" backgroundColor="orange" onClick={deleteAllHandler}>
            Delete All
          </Button>
         
        </div>
      </div>
      <form>
        <div style={{ overflowX: 'auto', paddingTop: '35px' }}>
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>Scenario Id</th>
                <th>Scenario Name</th>
                <th>Scenario Time</th>
                <th>Number of Vehicles</th>
                <th>Add Vehicle</th>
                <th>Edit </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((s, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{s.scenario_name}</td>
                    <td>{s.speed}s</td> <td>{s.num_vehicles}</td>
                    <td style={{ cursor: 'pointer' }}>
                      <Link
                        to={{
                          pathname: '/addv',
                          state: { scenario_name: s.scenario_name },
                        }}
                      >
                        <AiFillPlusCircle style={{ size: '30px' , color: 'black'}} />
                      </Link>
                    </td>
                    <td style={{ cursor: 'pointer' }}>
                      <Link to={`/editscenario/${s.id}`}>
                        <AiFillEdit style={{ color:'black'}} />
                      </Link>
                    </td>
                    <td
                      onClick={() => deleteHandler(s.id, s.scenario_name)}
                      style={{ cursor: 'pointer' }}
                    >
                      <AiFillDelete />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </form>
    </section>
  );
};

export default Scenario;
