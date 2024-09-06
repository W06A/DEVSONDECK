import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Swal from 'sweetalert2';
import axios from 'axios';



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
  padding-bottom:20px; padding:10px 20px;
  margin:0 auto;
  margin-top:10px;

`;

const StyledFormGroup = styled.div`
display:flex;
  align-items: center;
  margin-bottom: 15px;
  
`;
const StyledLabel = styled.label`
display:flex;
padding-right: 10px;
text-align: center;
  
`;
const StyledInput = styled.input`
  
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
`;
const Styledselect = styled.select`
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  width: calc(100% - 5px);
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
  
const StyledContainerFluid = styled.div`
    background-color: brown;
    display:flex;
    justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const StyledLinkList = styled.ul`
list-style: none;
display: flex;
justify-content: flex-end;
align-items: center;
padding: 0;
margin: 0;
  
`;

const StyledLinkItem = styled.li`
  margin-right: 20px;
  &:last-child {
    margin-left: 0; 
  }
`;
const StyledRow=styled.div`
display:flex;
justify-content: space-between;
width: 100%;
`
;

const DevRegisterForm = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setSelectedState] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const navigate=useNavigate();
   
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
        const response = await axios.post('http://localhost:8000/api/devs/register', {
          firstname:firstname,
          lastname:lastname,
          email: email,
          address:address,
          city:city,
          state:state,
          password: password,
          
        });
        console.log('Response:', response); 
        if (response.status === 200) {
          localStorage.setItem('devId', response.data._id);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registration successful',
            showConfirmButton: false,
            timer: 1500,
          });
          
          navigate(`devs/skills/Languages`);
          
         
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
    const selectedState = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    return (
      <div>
           <StyledContainerFluid>
            <SubTitle>DevsOnDeck</SubTitle>
            <StyledLinkList className="Link">
             <StyledLinkItem>
              <Link to="/devs/login ">Dev Login</Link>
              </StyledLinkItem>
              <StyledLinkItem>
              <Link to="/orgs/login">Org Login</Link>
            </StyledLinkItem>
            </StyledLinkList>
          </StyledContainerFluid>

        <Container>
          <Title>Developer Sign Up</Title>
          
            <StyledRow className="row">
                <div className="col">
                  <StyledFormGroup >
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
                    <StyledLabel htmlFor="lastname">Last Name</StyledLabel>
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
            <StyledLabel htmlFor="email">Email</StyledLabel>
              <StyledInput
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            <div className="col">
            <StyledFormGroup>
            <StyledLabel htmlFor="address">Address</StyledLabel>
              <StyledInput
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            <StyledRow className="row">
                <div className=" col">
                <StyledFormGroup>
                  < StyledLabel htmlFor="city">City</StyledLabel>
                  <StyledInput
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  </StyledFormGroup>
                 </div>
                <div className="col">
                <StyledFormGroup>
                  <StyledLabel htmlFor="state">State</StyledLabel>  
                  <Styledselect
                   id="state"
                  name="state"
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
            <StyledLabel htmlFor="password">Password</StyledLabel>
              <StyledInput
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </StyledFormGroup>
            </div>
            <div className="col">
            <StyledFormGroup>
            <StyledLabel htmlFor="confirm">Confirm</StyledLabel>
              <StyledInput
                type="password"
                name="confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              </StyledFormGroup>
              
            </div>
            
            <StyledDiv>
            <RegisterButton onClick={handleRegister} className="btn btn-success">
              Register
            </RegisterButton>
            
            <CenteredLink to="/orgs/register">
              Need to sign up as an organization?
            </CenteredLink>
            </StyledDiv >
            </Container>
        </div>
      
    );
  }




export default DevRegisterForm;
