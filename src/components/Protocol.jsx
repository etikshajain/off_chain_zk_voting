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
    <div>
      {create == true ? <a className={location.pathname === "/createprop" ? "active" : ""}><Link to="/createprop" className="cta-button connect-wallet-button">Create Proposal</Link></a> : <button className="btn btn-primary disabled" style={{ marginBottom: "0px" }}>Create Proposal</button>}


      <div className="row my-3">
        <div className="container mx-2">
          {proposals.length === 0 && "No Proposals as of now, create one!!"}
        </div>
        {
          proposals.slice(0).reverse().map((proposal) => {
            return <><Proposal key={proposal.id} proposal={proposal} tokens={props.tokens} /></>
          })}
      </div>
    </div>
  )
}

export default Protocol
