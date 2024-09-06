import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import LogoutSVG from '../../../components/LogoutSVG';
import '../../../index.css';

const StyledContainerFluid = styled.div`
    background-color: brown;
    display:flex;
    justify-content: space-between;
    margin-bottom:20px;
`;


const Container = styled.div`
  margin-top:20px;
  border: 2px solid black;
  width: 80%;
  padding-bottom:20px;
  margin:0 auto;
`;

const Col = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const FrameworkInfo = styled.div`
  hight:auto;
  border: 2px solid black;
`;

const FrameworkDetails = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
`;

const TextArea = styled.div`
  margin-top: 20px;
  padding: 0 10px;
`;

const StyledContainerFluid1 = styled.div`
  background-color: blue;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 2px solid black;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubTitle = styled.h1`
  color: white;
  padding: 10px;
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton1 = styled.button`
  padding: 10px 20px;
  background-color: blue;
  color: black;
  border: none;
  width: 30%;
  margin-bottom: 10px;
  font-size: 20px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 500;
  float:right;
`;

const Styleddiv1 = styled.div`
  display:flex;
  overflow-x: auto;
  gap: 20px;
`;

const Styleddiv = styled.div`
  display:flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FrameworkPage = () => {
  const [bio, setBio] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills] = useState([
    'HTML 5', 'CSS 3', 'JavaScript', 'Python', 'SQL', 'Java', 'Csharp', 'PHP', 'XML', 'mongodB', 'Express.js', 'angular', 'Node.js', 'React', 'Vue.js', 'jQuery', 'Backbone', 'Bootstrap', 'Materialize', 'Django', 'Flask', 'Bottle', 'CherryPy', 'Meteor', 'Pyramid', 'MySQL', 'PostgreSQL'
  ]);
  

 const navigate= useNavigate();

 const handleSkillsClick = (skill) => {
  if (!selectedSkills.includes(skill)) {
    setSelectedSkills([...selectedSkills, skill]);
  } else {
    setSelectedSkills(selectedSkills);
  }
};
  

  const handleNext = () => {
    navigate('/orgs/dashboard')
  };

  

  const handleLogout = () => {
    navigate('/')
    // Add your logout logic here
    console.log('Logging out...');
  };
  
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const location = useLocation();

  useEffect(() => {
    const devId = localStorage.getItem('devId');
    if (!devId) {
      console.error('DevId not found in localStorage');
      return;
    }
    const skillsData = {
      devId: devId,
      skills:skills,
      bio: bio,
      selectedSkills: selectedSkills,
      
    };
  
    console.log('Skills data:', skillsData);
  
    axios.post('http://localhost:8000/api/devs/skills/Frameworks', skillsData) 
      .then((response) => {
        console.log('Response:', response.data);
        console.log('Data received successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [skills,selectedSkills, bio]);
  
  useEffect(() => {
    if (location.state && location.state.bio) {
      setBio(location.state.bio);
    }
  }, [location.state]);

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
        <StyledContainerFluid1>
          <h1>Add Your skills</h1>
          <div className=" progress-bar-striped bg-warning mt-3 " role="progressbar" style={{width:'30%',height:'20px'}} ></div>
        </StyledContainerFluid1>
        <div className="row">
          <Col>
            <h4>Pick Your Top 5 Frameworks And Libraries</h4>
            <FrameworkInfo>
              <div
                data-bs-spy="scroll"
                data-bs-target="#skills"
                data-bs-offset="0"
                className="scrollspy-example-2"
                tabIndex="0"
                style={{ overflowY: 'scroll' }}
              >
                <Styleddiv>
                {skills.map((skill) => (
                    <figure key={skill} > 
                    <img src={`/img/${skill}.png`} 
                      alt={skill} style={{ width: '50px', height:'50px',backgroundColor: selectedSkills.includes(skill) ? 'lightgray' : 'transparent' }}
                      onClick={() => handleSkillsClick(skill)}
                      />
                      <figcaption>{skill}</figcaption>
                    </figure>
                  ))}
                </Styleddiv>
              </div>
            </FrameworkInfo>
          </Col>
          <Col>
            <FrameworkDetails>
              <Styleddiv1> 
              {selectedSkills && selectedSkills.map((skill, index) => (
                
      <figure key={index} onClick={() => handleSkillsClick(skill)}>
        <img 
          src={`/img/${skill}.png`} 
          alt={skill} 
          style={{ width: '20px', height: '20px', }}
        />
        <figcaption>{skill}</figcaption>
      </figure>
    ))}
              </Styleddiv1>
              </FrameworkDetails>
              <TextArea>
                
                <StyledTextArea  onChange={handleBioChange} value={bio} />
              </TextArea>
           
          </Col>
        </div>
        <Buttons>
          <StyledButton1 className="btn btn-primary" onClick={handleNext}>
            COMPLETED PROFILE
          </StyledButton1>
        </Buttons>
      </Container>
    </div>
  );
};

export default FrameworkPage;
