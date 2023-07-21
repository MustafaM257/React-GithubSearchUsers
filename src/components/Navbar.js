import React from 'react';
import styled from 'styled-components';
import {AiFillGithub} from 'react-icons/ai'
const Navbar = () => {
  return <Wrapper>
    
      <h3>
        Powered By <AiFillGithub />   <a href='https://github.com/MustafaM257' target='_blank' rel='noopener noreferrer'>Mustafa</a>
      </h3>
  </Wrapper>
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  a{
    color:inherit;
    text-decoration:inherit;
    background:transparent;
  }
  h3 {
    margin-bottom: 0;
    font-weight: 400;
  }`;

export default Navbar;
