import '../styles/App.css';
import { ethers } from "ethers";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import proposalContext from '../context/context'

const Home = () => {
  let location = useLocation();
  useEffect(() => {
    //console.log(location.pathname);
  }, [location]);

  const { currentAccount, checkIfWalletIsConnected, connectWallet } = useContext(proposalContext);

  const renderUI = () => (
    <>
      <span className="home-text">“ MAKING VOTING BETTER ”</span>
      <Link to="/protocols" className="btn btn-dark home-btn">Let's Get Started</Link>
      {/* <a className={location.pathname === "/protocols" ? "active" : ""}><Link to="/protocols" className="cta-button connect-wallet-button">Protocols</Link></a> */}
    </>
  )

  return (
    <>
    <div class="container text-center"  style={{marginTop:"20px"}}>
      <div className="row">
        <div className="col home-left">
        <img src="https://i.ibb.co/fF1CZz8/bc-300861-10-1.png" alt="bc-300861-10-1" border="0" height="500" width="500"/>
        </div>
        <div className="col home-right">
        {renderUI()}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;