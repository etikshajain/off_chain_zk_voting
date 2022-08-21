import React from 'react'
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

const Proposal = (props) => {
  const [vote, setVote] = useState("vote")

  useEffect(() => {
    if (props.proposal.min_tokens_to_vote > props.tokens) {
      setVote("cannot");
    }
    else {
      setVote("vote");
    }
  }, [])

  let dt = new Date();
  let ds = new Date(props.proposal.start_time);
  let de = new Date(props.proposal.end_time);
  if (dt > de) {
    if (vote === "vote") {
      setVote("This proposal is now closed.")
    }
  }

  if (dt < ds) {
    if (vote === "vote") {
      setVote("This proposal is not opened yet.")
    }
  }

  const [hover, sethover] = useState(false)
  const toggleHover = () => {
    sethover(!hover);
  }
  var linkStyle;
  if (hover) {
    linkStyle = { textDecoration: "underline", cursor: 'pointer' }
  } else {
    linkStyle = { color: '#000' }
  }
  return (
    <>
    <div class="card" style={{marginBottom:"15px"}}>
    <div class="row" style={{margin:"15px", marginBottom:"0px"}}>
    <div class="col-1" style={{width:"36px", height:"36px", marginRight:"3px"}}><img src="https://i.ibb.co/25ffKLH/Ellipse-1.png" alt="Ellipse-1" border="0" height="36" width="36"/></div>
    <div class="col-8" style={{textAlign:"left", marginTop:"4px"}}><p>0x5346387920874352631</p></div>
    <div class="col-3" style={{textAlign:"left", marginTop:"4px"}}>
    {dt > de ? <span className="badge bg-danger" style={{ width: "160px" }}>Closed</span> : dt < ds ? <span className="badge bg-warning" style={{ width: "160px"}}>Opening Soon</span> : <span className="badge bg-success" style={{ width: "160px"}}>Active</span>}
    </div>
    </div>
    <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>

    <h3 class="card-title">{props.proposal.title}</h3>

    <p>{props.proposal.description}</p>
    <p><strong>Deadline : </strong>{props.proposal.end_time}</p>
    </div>

    <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>
    {vote === "vote" ?
    <>
      <div class="col-4"><button type="button" className="btn btn-primary" onClick={() => {window.alert("voted")}} style = {{marginLeft: "50px" }}>Agree</button>
      </div>
      <div class="col-4"><button type="button" className="btn btn-primary" onClick={() => {window.alert("voted")}} style = {{marginLeft: "50px" }}>Disagree</button>
      </div>
      <div class="col-4"><button type="button" className="btn btn-primary" onClick={() => {window.alert("voted")}} style = {{marginLeft: "50px" }}>Can't Decide</button>
      </div>
      </>: <></>}
    </div>

    {vote==="vote" || dt>de ? 
    <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>
        <button type="button" className="btn btn-primary" onClick={() => { }} style={{ marginLeftt: "50px"}}>View Voters</button>
    </div> :<></>}

    </div>
    </>
  )
}

export default Proposal
