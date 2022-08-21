import '../styles/App.css';
import { ethers } from "ethers";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import proposalContext from '../context/context'

const Protocols = () => {
  let location = useLocation();
  useEffect(() => {
    //console.log(location.pathname);
  }, [location]);

  const { currentAccount, checkIfWalletIsConnected, connectWallet } = useContext(proposalContext);
  // Setup our listener for contract events.
  const setupEventListener = async () => {
  }


  const renderUI = () => (
      <>
      <div class="container text-center"  style={{marginTop:"20px"}}>
        <div className="row">

          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
            <img src="https://i.ibb.co/R6bR9mn/Rectangle-16.png" alt="Rectangle-16" className="protocol-img" width="120" height="120"/>
            <div class="card-body">
              <h5 class="card-title">ENS</h5>
              <p class="card-text">64k members</p>
              <a href="#" class="btn btn-dark"><Link to="/protocol">Join</Link></a>
            </div>
          </div>
          </div>
          
          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
            <img src="https://i.ibb.co/R6bR9mn/Rectangle-16.png" alt="Rectangle-16" className="protocol-img" width="120" height="120"/>
            <div class="card-body">
              <h5 class="card-title">ENS</h5>
              <p class="card-text">64k members</p>
              <a href="#" class="btn btn-dark">Join</a>
            </div>
          </div>
          </div>

          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
            <img src="https://i.ibb.co/R6bR9mn/Rectangle-16.png" alt="Rectangle-16" className="protocol-img" width="120" height="120"/>
            <div class="card-body">
              <h5 class="card-title">ENS</h5>
              <p class="card-text">64k members</p>
              <a href="#" class="btn btn-dark">Join</a>
            </div>
          </div>
          </div>

          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
            <img src="https://i.ibb.co/R6bR9mn/Rectangle-16.png" alt="Rectangle-16" className="protocol-img" width="120" height="120"/>
            <div class="card-body">
              <h5 class="card-title">ENS</h5>
              <p class="card-text">64k members</p>
              <a href="#" class="btn btn-dark">Join</a>
            </div>
          </div>
          </div>

          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
            <img src="https://i.ibb.co/R6bR9mn/Rectangle-16.png" alt="Rectangle-16" className="protocol-img" width="120" height="120"/>
            <div class="card-body">
              <h5 class="card-title">ENS</h5>
              <p class="card-text">64k members</p>
              <a href="#" class="btn btn-dark">Join</a>
            </div>
          </div>
          </div>

        </div>
      </div>
    </>
  )

  return (
    <div className="Home">
      {renderUI()}
    </div>
  );
};

export default Protocols;