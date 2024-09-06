import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';


const StyledContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color:#A9A9A9;
  padding: 20px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;

`;
const StyledContainerFluid = styled.div`
    background-color: brown;
    display:flex;
    justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom:24px;
`;

const StyledLinkList = styled.ul`
  list-style: none; 
  padding: 0; 
  display: flex;
  
`;

const StyledLinkItem = styled.li`
  margin-right: 20px;
  &:last-child {
    margin-right: 0; 
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
const Title1 = styled.h5`
  
  color: black;
  text-align: center;
  padding: 10px;
`;
const StyledFormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
`;
const StyledLabel = styled.label`
  width: 30%;
  
  padding-right: 10px;
`;
const StyledInput = styled.input`
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
`;
const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  width: 20%;
  margin-bottom: 10px;
  align-self: flex-end;
`;

const DevLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/devs/login', {
        email:email,
        password: password,
        });

      if (response.status === 200) {
        localStorage.setItem('devs', JSON.stringify(response.data));
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1500,
            });
      
         navigate(`/devs/skills/Languages`);
       }
       else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Email or password invalid',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred during login',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
       <StyledContainerFluid>
      <SubTitle>DevsOnDeck</SubTitle>
      <StyledLinkList className="Link">
        <StyledLinkItem>
          <Link to="/">Dev Registration</Link>
        </StyledLinkItem>
        <StyledLinkItem>
          <Link to="/orgs/register">Org Registration</Link>
        </StyledLinkItem>
      </StyledLinkList>
    </StyledContainerFluid>

      <StyledContainer>
         <Title>Welcome Back, Developer!</Title>
         <Title1>Let's Connect To A Job</Title1>
         <div className="col">
          <StyledFormGroup>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                    required
            />
            </StyledFormGroup>
        </div>
        <div className="col">
          <StyledFormGroup>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          type="password"
          name="password"
          
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </StyledFormGroup>
        </div>
        <LoginButton onClick={handleLogin} className="btn btn-success">
              Login
         </LoginButton>
      </StyledContainer>
    </div>
  );
};

export default DevLoginForm;
