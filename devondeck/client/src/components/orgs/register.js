import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';


const StyledContainerFluid = styled.div`
    background-color: brown;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    display:flex;
`;

const StyledLinkList = styled.ul`
  list-style: none; 
  padding: 0; 
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
`;

const StyledLinkItem = styled.li`
  margin-right: 20px;
  &:last-child {
    margin-left: 0; 
  }
`;
const SubTitle= styled.h1`
color: white;
padding: 10px;
`;
const Title = styled.h2`
  
  color: black;
  text-align: center;
  padding: 10px;
`;
const Container = styled.div`
  margin-top:20px;
  border: 2px solid black;
  background-color:#A9A9A9;
  width: 80%;
  padding-bottom:20px; 
  padding:10px 20px;
  margin:0 auto;
  margin-top:10px;

`;
const StyledFormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  
`;
const Styledselect=styled.select`
padding: 8px;
border: 2px solid black;
border-radius: 5px;
width: 30%;
margin-bottom: 15px;
`;


const StyledLabel = styled.label`
  width: 30%;
  
  padding-right: 10px;
`;
const StyledInput = styled.input`
  padding: 8px;
  border: 2px solid black;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  width: 20%;
  
  margin-bottom: 10px;
  align-self: flex-end;
`;
const CenteredLink = styled(Link)`
  text-align: center;
  margin: 0 auto;
  
  width: fit-content;
`;
const StyledDiv= styled.div`
display: flex;
flex-direction: column;;
  `
  ;
  const StyledRow=styled.div`
display:flex;
justify-content: space-between;
width: 100%;
`
;


const OrgRegisterForm = () => {
  const [orgname, setOrgName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgCity, setOrgCity] = useState('');
  const [state, setSelectedState] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');


  

  const navigate=useNavigate()
   
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Passwords do not match',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8000/api/orgs/register', {
        orgname:orgname,
        firstname:firstname,
        lastname:lastname,
        contactEmail: contactEmail,
        orgAddress:orgAddress,
        orgCity:orgCity,
        state:state,
        password:password,
        
        
      });

      if (response.status === 200) {
        localStorage.setItem('orgId',(response.data._id));
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registration successful',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/orgs/login');
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'An error occurred during registration',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
    const selectedState = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    
    return (
      <div>
        <StyledContainerFluid>
            <SubTitle>DevsOnDeck</SubTitle>
            <StyledLinkList className="Link">
             <StyledLinkItem>
              <Link to="/devs/login">Dev Login</Link>
              </StyledLinkItem>
              <StyledLinkItem>
              <Link to="/orgs/login">Org Login</Link>
            </StyledLinkItem>
            </StyledLinkList>
          </StyledContainerFluid>

        <Container>
          <Title>organization Sign Up</Title>
          
            <div className="col">
            <StyledFormGroup>
            <StyledLabel htmlFor="orgname">Orgname</StyledLabel>
              <StyledInput
              
                type="text"
                name="orgname"
                value={orgname}
                onChange={(e) => setOrgName(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            <StyledRow className="row ">
              <div className="col">
              <StyledFormGroup>
                <StyledLabel htmlFor="firstname">First Name</StyledLabel>
                <StyledInput
                 type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                />
                </StyledFormGroup>
            </div>
            
            <div className="col">
            <StyledFormGroup>
              <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
              <StyledInput
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            </StyledRow>
            <div className="col">
            <StyledFormGroup>
                <StyledLabel htmlFor="contactEmail">Contact Email</StyledLabel>
                <StyledInput
                type="email"
                name="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            <div className="col">
            <StyledFormGroup>
            <StyledLabel htmlFor="OrgAddress">OrgAddress</StyledLabel>
              <StyledInput
                type="text"
                name="Orgaddress"
                value={orgAddress}
                onChange={(e) => setOrgAddress(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            <StyledRow className="row">
              <div className="col">
              <StyledFormGroup>
                <StyledLabel htmlFor="OrgCity">OrgCity</StyledLabel>
                <StyledInput
                type="text"
                name="OrgCity"
                value={orgCity}
                onChange={(e) => setOrgCity(e.target.value)}
              />
              </StyledFormGroup>
              </div>
              <div className="col">
              <StyledFormGroup>
                 <StyledLabel htmlFor="state">State</StyledLabel>  
                  <Styledselect
                   id="state"
                  name="State"
                  value={state}
                  onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">ALL</option>
                        {selectedState.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                          </option>
                      ))}
                </Styledselect>
                </StyledFormGroup>
             </div>  
            </StyledRow>
            
            <div className="col">
            <StyledFormGroup>
            <StyledLabel htmlFor="Password">Password</StyledLabel>
              <StyledInput
                type="password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            <div className="col">
            <StyledFormGroup>
            <StyledLabel htmlFor="Confirm">Confirm</StyledLabel>
              <StyledInput
                type="password"
                name="Confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            <StyledDiv>
            <RegisterButton onClick={handleRegister} className="btn btn-success">
              Register
            </RegisterButton>
            
            <CenteredLink to="/devs/register">
              Need to sign up as a Developer?
            </CenteredLink>
            </StyledDiv >
            </Container>
        </div>
        
    
    );
  }


export default OrgRegisterForm;
