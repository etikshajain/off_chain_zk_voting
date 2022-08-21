import React from 'react'
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import proposalContext from '../context/context'
//props.proposal
const Proposal = (props) => {
  const [vote, setVote] = useState("vote")
  const { tokens, getTokens, checkVoter, getVoterslist, registerVote, currentAccount } = useContext(proposalContext);
  let dt = new Date();
  let ds = new Date(props.proposal.start_time);
  let de = new Date(props.proposal.end_time);
  useEffect(() => {
    getTokens();
    const voted = async ()=>{
        const v = await checkVoter(props.protocol, props.proposal.id, currentAccount);
        console.log("already voted:")
        if(v===true){
          setVote("Already Voted")
        }
        return v;
    }
    let v = voted()
    if (props.proposal.min_tokens_to_vote > tokens) {
      setVote("Insufficient tokens.");
    }
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

    if(v==true){
      console.log("yes")
      setVote("Already Voted")
    }
    else {
      setVote("vote");
    }
  }, [])

  const [hover, sethover] = useState(false)
    const toggleHover=()=> {
        sethover(!hover);
    }
    var linkStyle;
    if (hover) {
        linkStyle = {textDecoration:"underline",cursor: 'pointer'}
    } else {
        linkStyle = {color: '#000'}
    }

    const [hover2, sethover2] = useState(false)
    const toggleHover2=()=> {
        sethover2(!hover2);
    }
    var linkStyle2;
    if (hover2) {
        linkStyle2 = {textDecoration:"underline",cursor: 'pointer'}
    } else {
        linkStyle2 = {color: '#000'}
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

    <h2 className="card-title" style={{display:"inline"}}><a type="button" style={linkStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={()=>{props.ViewProp(props.proposal.protocol, props.proposal)}}>{props.proposal.title}</a></h2>
    {/* <h3 class="card-title">{props.proposal.title}</h3> */}

    <p>{props.proposal.description}</p>
    <p><strong>Deadline : </strong>{props.proposal.end_time}</p>
    </div>

    <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>
    {vote === "vote" ?
    <>
      <div class="col-4"><button type="button" className="btn btn-primary" onClick={()=>{props.Vote(props.proposal.protocol, props.proposal.id, props.proposal.mongo_id, 0)}} style = {{marginLeft: "50px" }}>Agree</button>
      </div>
      <div class="col-4"><button type="button" className="btn btn-primary" onClick={() =>{props.Vote(props.proposal.protocol, props.proposal.id, props.proposal.mongo_id, 0)}} style = {{marginLeft: "50px" }}>Disagree</button>
      </div>
      </>: <>
        <div class="col-8"><button type="button" className="btn btn-primary disabled" style = {{marginLeft: "50px" }}>{vote}</button>
      </div>
      </>}
    </div>

    {vote==="vote" || vote==="Already Voted" || dt>de ? 
    <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>
        <button type="button" className="btn btn-primary" onClick={() => {props.ViewVoters(props.proposal.protocol, props.proposal.id)}} style={{ marginLeftt: "50px"}}>View Voters</button>
    </div> :<></>}

    </div>
    </>
  )
}

export default Proposal
