import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Container } from 'reactstrap';
import LogoutSVG from '../../components/LogoutSVG';
import '../../index.css';

const StyledContainerFluid = styled.div`
  background-color: brown;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.h1`
  color: white;
  display: flex;
  justify-content: center;
  align-item: center;
  padding: 10px;
  font-family: 'Rajdhani', sans-serif;
`;

const StyledLink = styled(Link)`
  color: white;
  float: left;
  padding: 10px;
  font-weight: 500;
  font-size: 40px;
  font-family: 'Rajdhani', sans-serif;
`;

const PositionButton = styled.button`
  padding: 10px 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  width: 50%;
  margin-bottom: 10px;
`;

const StyledLink1 = styled(Link)`
  display: flex;
`;

const StyledContainerFluid2 = styled.div`
  width: 80%;
  border: 2px solid black;
`;

const Subheader = styled.div`
  background-color: #a9a9a9;
  color: black;
  width: 100%;
  border: 2px solid black;
`;

const Container1 = styled.div`
  border: 2px solid black;
  width: 50%;
  height: 100%;
  padding-left: 10px;
`;

const OrgDashboardComponent = () => {
  const [availableDevs, setAvailableDevs] = useState([]);
  const selectedSkills = [];
  const [positions, setPositions] = useState([]);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    console.log('Logging out...');
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/orgs/dashboard')
    .then((response) => {
      console.log('Response:', response.data);
      if (Array.isArray(response.data.positions)) {
        setPositions(response.data.positions);
      } else {
        console.error('Positions data not found in response');
      }
      if (Array.isArray(response.data.availableDevs)) {
        setAvailableDevs(response.data.availableDevs);
      } else {
        console.error('Response data is not an array');
      }
    })
    .catch((error) => {
      console.error('Error fetching dashboard data', error);
    });
}, []);

  const handleListNewPosition = () => {
    navigate('/orgs/jobs/new');
  };

  return (
    <div>
      <StyledContainerFluid>
        <StyledLink>coding Dojo</StyledLink>
        <SubTitle>DevsOnDeck</SubTitle>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h5 style={{ marginRight: '10px' }}>Logout</h5>
          <LogoutSVG onClick={handleLogout} />
        </div>
      </StyledContainerFluid>

      <Container>
        <div className="row">
          <Col xs={12} md={5}>
            <PositionButton onClick={handleListNewPosition} className="btn btn-success">
              List a New Position
            </PositionButton>
            <Container1>
              <h3>Positions To Fill</h3>
              {positions !== null && positions.length > 0 ? (
                positions.map((position) => (
                  <StyledLink1 key={position._id} to={`/orgs/jobs/${position._id}`} state={{ title: position.name }}>
                     {position.name}
                 </StyledLink1>
                  ))
                ) : (
              <p>No positions available</p>
                )}
            </Container1>
          </Col>

          <Col xs={12} md={7}>
            <StyledContainerFluid2>
              <Subheader>
                <h2 className="text-center">Available Devs</h2>
              </Subheader>
              <div
                data-bs-spy="scroll"
                data-bs-target="#"
                data-bs-offset="0"
                className="scrollspy-example-2"
                tabIndex="0"
                style={{ overflowY: 'scroll', height: '400px' }}
              >
                {availableDevs.length > 0 ? (
                  availableDevs.map((dev, index) => (
                    <div key={index} style={{ border: '2px solid black', padding: '20px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
                      <h4 style={{ textDecoration: 'underline' }}>
                        {dev.firstname} {dev.lastname}
                      </h4>
                      {dev.devskills && dev.devskills.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: '5px' }}>
                          {dev.devskills.map((skill, skillIndex) => (
                            <div key={skillIndex} >
                              <img src={`/img/${skill}.png`} alt={skill} style={{ width: '50px', height: '50px', backgroundColor: selectedSkills.includes(skill) ? 'lightgray' : 'transparent', marginRight: '10px' }} />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                      ) : ''}
                      <p>{dev.bio}</p>
                    </div>
                  ))
                ) : (
                  <p>No available developers</p>
                )}
              </div>
            </StyledContainerFluid2>
          </Col>
        </div>
      </Container>
    </div>
  );
}

export default OrgDashboardComponent;
