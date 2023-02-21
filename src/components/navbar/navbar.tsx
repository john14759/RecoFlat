import React from 'react';
import './navbar.css';
import { PageProps } from '../../functions/types';
import { AboutUs } from '../../pages/aboutus/aboutus';
const Nav = (props: PageProps) => {
  
  return (
    <div className="app-nav">
      <img src={require('./teamtwo.png')} alt="RecoFlat logo" />
      <div onClick={() =>props.switchTo("main")}className="app-logo">Recoflat</div>
      <div className="app-actions">
        <div className="app-action">
          <span>How to use?</span>
          <img className='search' src={require('./Vector.png')} alt="icon" width="31" height="23"/>
          <div className="line"></div>
        </div>
        <div className="app-action">
        <span onClick={() =>props.switchTo("aboutus")}>About us</span>
        <img  src={require('./human.png')} alt="icon" width="30" height="25.33"/>
        <div className="line2"></div>
      </div>
      </div>
    </div>
  );
};

export default Nav;