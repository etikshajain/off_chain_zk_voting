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

  const { proposals, getAllProposals , tokens, getTokens, checkVoter, getVoterslist, registerVote, currentAccount} = useContext(proposalContext);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    getAllProposals(props.protocol);
    getTokens()
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

    const ViewVoters = async (protocol, proposal_id)=>{
        setModal("voters")
        const voters_list = await getVoterslist(protocol, proposal_id)
        if(voters===undefined){
          setVoters([]);
        }
        else{
          setVoters(voters_list);
        }
        ref.current.click();
        refClose.current.click();
        console.log(voters);
    }
    const ViewProp = async (protocol, proposal)=>{
        setModal(proposal)
        ref.current.click();
        refClose.current.click();
    }

    const Vote = async (protocol, proposal_id, proposal_mongo_id, option_id)=>{
        const r = await registerVote(protocol, proposal_id, proposal_mongo_id, option_id)
        // alert("Voting successful!");
        navigate("/protocols")
        getAllProposals()
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
                    <h1 className="modal-title" id="exampleModalLabel">{modal==="voters"?"Voters":modal.title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className="my-3">
                    {modal==="voters"?
                    <div className="mb-3">
                    <table className="table" style={{border:"1px solid black"}}>
                    <thead>
                        <tr style={{textAlign:"center", border:"1px solid black"}}>
                        <th scope="col" style={{textAlign:"center", border:"1px solid black"}}>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        voters.map((voter)=>{
                         if(voter!==null){
                         return <tr style={{ border:"1px solid black"}}>
                                    <td style={{textAlign:"center", border:"1px solid black"}}>{voter}</td>\
                                </tr>}   
                    })}
                    </tbody>
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
            <Proposal key={proposal.id} proposal={proposal} ViewVoters={ViewVoters} ViewProp={ViewProp} Vote={Vote}/>
            </>
          })}
          </div>
          
          <div className="col-3" style={{marginTop:"40px"}}>
          <div class="card">
            <img src="https://i.ibb.co/R6bR9mn/Rectangle-16.png" alt="Rectangle-16" className="protocol-img" width="120" height="120"/>
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