import React from 'react'
import '../styles/App.css';
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import proposalContext from '../context/context'
import Proposal from './Proposal';
//protocol, tokens, min_tokens
const Protocol = (props) => {let location = useLocation();
  useEffect(() => {
      //console.log(location.pathname);
  }, [location]);

  const { proposals, getAllProposals } = useContext(proposalContext);
  const [create, setCreate] = useState(false);
  useEffect(() => {
    // console.log(localStorage.getItem('token'));
    getAllProposals(props.protocol);
    if (props.min_tokens_to_create > props.tokens) {
      setCreate(false);
    }
    else {
      setCreate(true);
    }
  }, [])

  return (
    <div style={{marginLeft:"75px", marginRight:"20px"}}>
    <h1>Proposals</h1>
    <div class="container text-center"  style={{marginTop:"20px"}}>
        <div className="row">

          <div className="col-9" style={{marginTop:"40px"}}>
          {proposals.length===0 ? <h2>No proposals created yet.</h2> : proposals.slice(0).reverse().map((proposal) => {
            return <><Proposal key={proposal.id} proposal={proposal} tokens={props.tokens} /></>
          })}
          </div>
          
          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
            <img src="https://i.ibb.co/R6bR9mn/Rectangle-16.png" alt="Rectangle-16" className="protocol-img" width="120" height="120"/>
            <div class="card-body">
              <h5 class="card-title">ENS</h5>
              {create == true ?<Link to="/createprop" className="btn btn-dark">New Proposal</Link> : <button className="btn btn-dark disabled">New Proposal</button>}
              <p class="card-text">64k members</p>
              <p class="card-text">About</p>
             
            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Protocol