
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LogoutSVG from '../../../components/LogoutSVG';
import { useNavigate } from 'react-router-dom';

const StyledContainerFluid = styled.div`
    background-color: brown;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:20px;
`;

const SubTitle = styled.h1`
    color: white;
    padding: 10px;
`;

const StyledLabel = styled.label`
    width: 30%;
    padding-right: 10px;
`;

const StyledInput = styled.input`
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
    width: 80%;
    margin-bottom: 15px;
    margin-left:20px;
`;

const Container = styled.div`
    border: 2px solid black;
    width: 50%;
    height:100%;
    margin: 0 auto;
`;

const PositionButton = styled.button`
    padding: 10px 20px;
    background-color: blue;
    color: black;
    border: none;
    width: 30%;
    margin-bottom: 10px;
    margin:0 auto;
    font-size: 20px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 500;
`;

const Subheader = styled.div`
    background-color: blue;
    color:black;
    width: 100%;
    border: 2px solid black;
`;

const Buttons = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
`;
const TextArea = styled.div`
  margin-top: 20px;
  margin-left:20px;
  
`;
const StyledTextArea = styled.textarea`
    width: 80%;
    height: 150px;
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
`;

function NewPositionPage() {
    const [positionName, setPositionName] = useState('');
    const [positionDescription, setPositionDescription] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skills] = useState([
      'HTML 5', 'CSS 3', 'JavaScript', 'python', 'sql', 'java', 'Csharp', 'php', 'xml', 'mongodb', 'Express.js', 'angular', 'Node.js', 'React', 'Vue.js', 'jQuery', 'backbone', 'bootstrap', 'materialize', 'django', 'flask', 'bottle', 'cherryPy','Meteor', 'Pyramid',  'mySQL', 'PostgreSQL']);
      
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'PositionName') {
            setPositionName(value);
        } else if (name === 'Description') {
            setPositionDescription(value);
        }
    };

    const handleSkillsClick = (skill) => {
      if (selectedSkills.includes(skill)) {
          setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
      } else {
          setSelectedSkills([...selectedSkills, skill]);
      }
  };
  const handleAddPosition = () => {
    const orgId = localStorage.getItem('orgId');
    if (!orgId) {
        console.error('OrgId not found in localStorage');
        return;
    }
        
    const newPosition = {
        orgId: orgId,
        position: {
            name: positionName,
            description: positionDescription,
            requiredSkills: selectedSkills,
        },
    };

    axios
        .post('http://localhost:8000/api/orgs/jobs/new', newPosition)
        .then((response) => {
            console.log('Position added successfully');
            setPositionName('');
            setPositionDescription('');
            setSelectedSkills([]);
            navigate('/orgs/dashboard');
        })
        .catch((error) => {
            console.error('Error adding position', error);
            // Add error handling for user feedback if needed
        });
};




    const handleLogout = () => {
        navigate('/');
        // Add your logout logic here
        console.log('Logging out...');
    };

    return (
        <div>
            <StyledContainerFluid>
                <SubTitle>DevsOnDeck</SubTitle>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h5 style={{ marginRight: '10px' }}>Logout</h5>
                    <LogoutSVG onClick={handleLogout} />
                </div>
            </StyledContainerFluid>
            <Container>
                <Subheader>
                    <h2>Add Your Position</h2>
                </Subheader>
                <div className="col">
                    <StyledLabel htmlFor="PositionName">Name</StyledLabel>
                    <StyledInput
                        type="text"
                        name="PositionName"
                        value={positionName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col">
                    <TextArea>
                        <h6>Description</h6>
                        <StyledTextArea
                            value={positionDescription}
                            onChange={(e) => setPositionDescription(e.target.value)}
                        />
                    </TextArea>
                </div>
                <h6>Skills</h6>
                <div style={{ border: '2px solid black', textAlign: 'center', width: '80%', marginLeft: '20px' }}>
                    <div
                        data-bs-spy="scroll"
                        data-bs-target="#skills"
                        data-bs-offset="0"
                        className="scrollspy-example-2"
                        tabIndex="0"
                        style={{ overflowY: 'scroll' }}
                    >
                        <div className="skills" id="skills" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {skills.map((skill, index) => (
                                <div key={index} onClick={() => handleSkillsClick(skill)} style={{ marginBottom: '5px', cursor: 'pointer' }}>
                                    <img src={`/img/${skill}.png`} alt={skill} style={{ width: '50px', height: '50px', backgroundColor: selectedSkills.includes(skill) ? '#5EFF33' : 'transparent' }} />
                                    <figcaption >{skill}</figcaption>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Buttons>
                    <PositionButton onClick={handleAddPosition} className="btn btn-success" >
                        AddPosition
                    </PositionButton>
                </Buttons>
            </Container>
        </div>
    );
}

export default NewPositionPage;