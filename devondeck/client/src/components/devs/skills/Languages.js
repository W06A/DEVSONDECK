import React, { useState ,useEffect  } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import LogoutSVG from '../../../components/LogoutSVG';
import '../../../index.css';



const StyledContainerFluid = styled.div`
    background-color: brown;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:20px;
`;


const Container = styled.div`
  margin-top:20px;
  border: 2px solid black;
  width: 80%;
  padding-bottom:20px;
  padding: 10px ;
  margin:0 auto;

`;
const Col = styled.div`
  width: 50%;
  display: flex;
   flex-direction: column;
`;
const LanguageInfo = styled.div`

border: 2px solid black;
`;
const LanguageDetails = styled.div`

display: flex;
border: 2px solid black;

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
const TextArea = styled.div`
  margin-top: 20px;
  padding: 0 10px;
`;
const StyledContainerFluid1= styled.div`

background-color: blue;
display: flex;
justify-content:space-between;

width: 100%;
border: 2px solid black;

`;

const StyledTextArea = styled.textarea.attrs(props => ({
  rows: props.rows || 10, 
  cols: props.cols || 200, 
}))`
  width: 100%;
  
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubTitle= styled.h1`
color: white;

padding: 10px;
`;
const Buttons = styled.div`
  margin-top: 20px;
  
  flex-direction: column; 
  align-items: center; 
`;
const StyledButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  font-size: 20px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 500;
  float:center:
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



const LanguagePage = () => {
  const [bio, setBio] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills] = useState([
    'HTML 5', 'CSS 3', 'JavaScript', 'python', 'sql', 'java', 'Csharp', 'php', 'xml', 'mongodb', 'Express.js', 'angular', 'Node.js', 'React', 'Vue.js', 'jQuery', 'backbone', 'bootstrap', 'materialize', 'django', 'flask', 'bottle', 'cherryPy','Meteor', 'Pyramid',  'mySQL', 'PostgreSQL']);
    
  
  const navigate=useNavigate();

  const handleSkillsClick = (skill) => {
    // Check if the skill is already selected
    const skillIndex = selectedSkills.indexOf(skill);
    
    if (skillIndex === -1) {
      // Skill not found in selectedSkills, so add it
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      // Skill found in selectedSkills, so remove it
      const updatedSkills = [...selectedSkills];
      updatedSkills.splice(skillIndex, 1);
      setSelectedSkills(updatedSkills);
    }
  };
  
  const handleBioChange = (event) => {
    setBio(event.target.value); 
    console.log('Bio:', event.target.value);
  };
  const handleSkip = () => {
    navigate('/devs/skills/Frameworks')
  };
  
    const handleNext = () => {
      if (selectedSkills.length === 0) {
        console.error('Please select at least one skill');
        return;
      }
      navigate('/devs/skills/Frameworks', { state: { bio: bio } })
      };
      const handleLogout = () => {
        navigate('/')
        // Add your logout logic here
        console.log('Logging out...');
      };
    

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

  axios.post('http://localhost:8000/api/devs/skills/Languages', skillsData) 
    .then((response) => {
      console.log('Response:', response.data);
      console.log('Data received successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error', error);
    });
}, [skills,selectedSkills, bio]);

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
          <div className=" progress-bar-striped bg-warning mt-3 " role="progressbar" style={{width:'30%',height:'20px',}} ></div>
          
          </StyledContainerFluid1>
          
        <div className="row">
          <Col>
            <h4>Pick Your Top 5 Languages</h4>
              <LanguageInfo>
             <div   
                data-bs-spy="scroll"
                data-bs-target="#skills"
                data-bs-offset="0"
                data-bs-smooth-scroll="true"
                className="scrollspy-example"
                tabIndex="0"
                style={{ overflowY: 'scroll' }}
             >
          
          <Styleddiv >
          
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
        </LanguageInfo>
      </Col>
      
      <Col>
      <LanguageDetails>
    { selectedSkills.map((skill) => (
      < Styleddiv1 key={skill}>
      < figure  onClick={() => handleSkillsClick(skill)}>
        <img 
          src={`/img/${skill}.png`} 
          alt={skill} 
          style={{ width: '20px', height: '20px', }}
        />
        <figcaption>{skill}</figcaption>
      </figure>
</Styleddiv1>
    ))}
  </LanguageDetails>
          <TextArea>
                <h3>Short Bio</h3>
                <StyledTextArea  onChange={handleBioChange} value={bio} />
            </TextArea>
              
           
      </Col>
    </div>
            
    <Buttons>
          
          <StyledButton onClick={handleSkip}>Skip This Step</StyledButton>
          
          <StyledButton1 onClick={handleNext}>Next Step: Frameworks & Libraries</StyledButton1>
        </Buttons>
    </Container>
  </div>
  );
               };             
export default LanguagePage;
