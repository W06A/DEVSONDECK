import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import LogoutSVG from '../../../components/LogoutSVG';

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
    align-items: center;
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

const StyledContainerFluid2 = styled.div`
    width: 80%;
    border: 2px solid black;
    margin: 0 auto;
    
`;

const Subheader = styled.div`
    background-color: #A9A9A9;
    color: black;
    width: 100%;
    border: 2px solid black;
`;

const DeveloperInfo = styled.div`
    
    border: 1px solid black;
     width:200px;
     margin-left: auto;
   
`;

const ShowJob = () => {
    const { positionId } = useParams();
    const [position, setPosition] = useState(null);
    const [matchedDevs, setMatchedDevs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/orgs/jobs/${positionId}`);
                setPosition(response.data.position);
                setMatchedDevs(response.data.matchedDevs);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchData();
    }, [positionId]);

    const matchDevToPosition = (devSkills, requiredSkills) => {
        if (!requiredSkills || requiredSkills.length === 0) {
            return 0;
        }

        const lowerDevSkills = devSkills.map(skill => skill.toLowerCase());
        const lowerRequiredSkills = requiredSkills.map(skill => skill.toLowerCase());

        const matchedSkills = lowerRequiredSkills.filter(skill => lowerDevSkills.includes(skill)).length;
        return (matchedSkills * 100) / requiredSkills.length;
    };

    const getMatchColor = (matchPercentage) => {
        if (matchPercentage <= 50) {
            return 'red';
        } else if (matchPercentage <= 80) {
            return 'orange';
        } else if (matchPercentage <= 90) {
            return 'yellow';
        } else {
            return 'green';
        }
    };

    const handleLogout = () => {
        navigate('/');
        console.log('Logging out...');
    };

    return (
        <div>
            <StyledContainerFluid>
                <StyledLink to="/">Coding Dojo</StyledLink>
                <SubTitle>DevsOnDeck</SubTitle>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h5 style={{ marginRight: '10px' }}>Logout</h5>
                    <LogoutSVG onClick={handleLogout} />
                </div>
            </StyledContainerFluid>
            <h1 style={{ textAlign: 'center' }}>{position?.name.replace(/-/g, ' ')}</h1>
            <StyledContainerFluid2>
                <Subheader>
                    <h2 className="text-center">Available Devs</h2>
                </Subheader>
                <div
                    className="scrollspy-example-2"
                    tabIndex="0"
                    style={{ overflowY: 'scroll', height: '400px' }}
                >
                    {matchedDevs.map(dev => {
                        const matchPercentage = matchDevToPosition(dev.devskills, position?.requiredSkills);
                        const matchColor = getMatchColor(matchPercentage);

                        return (
                            <div key={dev._id} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
                                <div>
                                    <h3 style={{ color: 'blue', textDecoration: 'underline' }}>{dev.firstname} {dev.lastname}</h3>
                                    {dev.devskills && dev.devskills.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: '5px' }}>
                                            {dev.devskills.map(skill => (
                                                <div key={skill} style={{ margin: '5px' }}>
                                                    <img src={`/img/${skill}.png`} alt={skill} style={{ marginRight: '5px', width: '50px', height: '50px' }} />
                                                    <span>{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <p>{dev.bio}</p>
                                    <DeveloperInfo style={{ backgroundColor: matchColor,  borderRadius: '5px'  }}>
                                    <p>Match Percentage: {Math.round(matchPercentage)}%</p>
                                    </DeveloperInfo>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </StyledContainerFluid2>
        </div>
    );
};

export default ShowJob;
