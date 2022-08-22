import React from 'react'
import '../styles/App.css';
import { useEffect, useState, useContext, useRef } from "react";
import { BrowserRouter as Router, Link, useLocation,useNavigate } from "react-router-dom";
import proposalContext from '../context/context'
import Proposal from './Proposal';
//protocol, tokens, min_tokens
const Protocol = (props) => {let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
      //console.log(location.pathname);
  }, [location]);

  const { get_results,proposals, getAllProposals , tokens, getTokens, registerVote, currentAccount} = useContext(proposalContext);
  const [create, setCreate] = useState(false);
  const [yescount, setyescount] = useState(0);
  const [nocount, setnocount] = useState(0);
  const [hash, sethash] = useState("");

  useEffect(() => {
    getAllProposals(props.protocol);
    getTokens(props.protocol)
    if (props.min_tokens_to_create > tokens) {
      setCreate(false);
    }
    else {
      setCreate(true);
    }
  }, [])

  const ref=useRef("");
  const refClose=useRef("");

  const [modal,setModal]=useState("");
  const[voters,setVoters]=useState([]);

    const ViewVoters = async (mongo_id)=>{
        const {yes, no,hash} = await get_results(mongo_id)
        setyescount(yes)
        setnocount(no)
        sethash(hash)
        setModal("Results")
      ref.current.click();
        refClose.current.click();
        // window.alert("voter list how?")
    }
    const ViewProp = async (proposal)=>{
        setModal(proposal)
        ref.current.click();
        refClose.current.click();
    }

    const Vote = async (sc_address, abi, proposal_mongo_id, option_id, priv_key, proof)=>{
        const r = await registerVote(sc_address, abi, proposal_mongo_id, option_id, priv_key, proof)
        navigate("/protocols")
        getAllProposals(props.protocol)
        // window.location.reload(true);

    }

  return (
    <div style={{marginLeft:"75px", marginRight:"20px"}}>
    <h1>Proposals</h1>

    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target=".bd-example-modal-xl">
    Launch demo modal
    </button>

    {/* MODAL */}
    <div className="modal fade bd-example-modal-xl" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title" id="exampleModalLabel">{modal==="Results"?"Results":modal.title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className="my-3">
                    {modal==="Results"?
                    <div className="mb-3">
                    <table className="table" style={{border:"1px solid black"}}>
                    <thead>
                        <tr style={{textAlign:"center", border:"1px solid black"}}>
                          <th>Agree </th>
                          <td>{yescount}</td>
                        </tr>
                        <tr style={{textAlign:"center", border:"1px solid black"}}>
                          <th>Disagree </th>
                          <td>{nocount}</td>
                        </tr>
                        <tr style={{textAlign:"center", border:"1px solid black"}}>
                          <th>List of proofs on IpfsHash </th>
                          <td>{hash}</td>
                        </tr>
                    </thead>
                    </table>
                    </div>:
                    <div className="mb-3">
                        <h5>Proposal:</h5>
                        <p>{modal.description}</p> 
                        <h6 style={{display:"inline"}}>Start time: </h6> {modal.start_time} <br/>
                        <h6 style={{display:"inline"}}>Deadline: </h6> {modal.end_time} <br/>
                    </div>
                    }
                </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>




    <div class="container text-center"  style={{marginTop:"20px"}}>
        <div className="row">

          <div className="col-9" style={{marginTop:"40px"}}>
          {proposals.length===0 ? <h2>No proposals created yet.</h2> : proposals.slice(0).reverse().map((proposal) => {
            return <>
            <Proposal key={proposal.mongo_id} proposal={proposal} ViewVoters={ViewVoters} ViewProp={ViewProp} Vote={Vote}/>
            </>
          })}
          </div>
          
          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
          <Link to="/protocol"><img src="https://i.ibb.co/pnTyFcH/aave.jpg" alt="Rectangle-16" className="protocol-img" width="120" height="120"/></Link>
            <div class="card-body">
              <h5 class="card-title">ENS</h5>
              {create === true ?<Link to="/createprop" className="btn btn-dark">New Proposal</Link> : <button className="btn btn-dark disabled">New Proposal</button>}
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