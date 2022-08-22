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
          <Link to="/protocol"><img src="https://i.ibb.co/pnTyFcH/aave.jpg" alt="Rectangle-16" className="protocol-img" width="120" height="120"/></Link>
            <div class="card-body">
              <h5 class="card-title">AAVE</h5>
              <p class="card-text">64k members</p>
              <button onClick={connectWallet} href="#" class="btn btn-dark">Join</button>
            </div>
          </div>
          </div>
          
          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
          <Link to="/protocol"><img src="https://i.ibb.co/nw5LVBY/balancer.jpg" alt="Rectangle-16" className="protocol-img" width="120" height="120"/></Link>
            <div class="card-body">
              <h5 class="card-title">Balancer</h5>
              <p class="card-text">64k members</p>
              <button onClick={connectWallet} href="#" class="btn btn-dark">Join</button>
            </div>
          </div>
          </div>

          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
          <Link to="/protocol"><img src="https://i.ibb.co/H2dfwFH/curve.webp" alt="Rectangle-16" className="protocol-img" width="120" height="120"/></Link>
            <div class="card-body">
              <h5 class="card-title">Curve</h5>
              <p class="card-text">64k members</p>
              <button onClick={connectWallet} href="#" class="btn btn-dark">Join</button>
            </div>
          </div>
          </div>

          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
          <Link to="/protocol"><img src="https://i.ibb.co/rQFWGv5/quickswap.jpg" alt="Rectangle-16" className="protocol-img" width="120" height="120"/></Link>
            <div class="card-body">
              <h5 class="card-title">QuickSwap</h5>
              <p class="card-text">64k members</p>
              <button onClick={connectWallet} href="#" class="btn btn-dark">Join</button>
            </div>
          </div>
          </div>

          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
          <Link to="/protocol"><img src="https://i.ibb.co/F8Q8gWN/uniswap.jpg" alt="Rectangle-16" className="protocol-img" width="120" height="120"/></Link>
            <div class="card-body">
              <h5 class="card-title">UniSwap</h5>
              <p class="card-text">64k members</p>
              <button onClick={connectWallet} href="#" class="btn btn-dark">Join</button>
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