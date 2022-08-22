import React from 'react'
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import proposalContext from '../context/context'
//props.proposal
const Proposal = (props) => {
  const [vote, setVote] = useState("vote")
  const [abi, setAbi] = useState("vote")
  const [maker, setmaker] = useState("0x0")
  const { getProposalMaker,tokens, getTokens, checkVoter, currentAccount, getAbi } = useContext(proposalContext);
  let dt = new Date();
  let ds = new Date(props.proposal.start_time);
  let de = new Date(props.proposal.end_time);
  const [proof, setproof] = useState("")

  const handleOnChange = (e) => {
    setproof(e.target.value);
  }
  useEffect(() => {
    getTokens(props.proposal.protocol);

    const fetchAbi = async ()=>{
      let abi = await getAbi(props.proposal.mongo_id)
      setAbi(abi)
      return abi
    }
    fetchAbi()

    const fetchMaker = async ()=>{
      let abii=await fetchAbi()
      console.log(abii)
      let m = await getProposalMaker(props.proposal.sc_address, abii)
      setmaker(m)
      return m
    }
    fetchMaker()
    const voted = async ()=>{
        const m = await fetchMaker()
        const abi_updated = await fetchAbi(props.proposal.mongo_id)
        const v = await checkVoter(props.proposal.sc_address, abi_updated);
        if(v===true){
          setVote("Already Voted")
        }
        return v;
    }
    let v = voted()
    if (tokens<1) {
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
    <div class="col-8" style={{textAlign:"left", marginTop:"4px"}}><p>{maker}</p></div>
    <div class="col-3" style={{textAlign:"left", marginTop:"4px"}}>
    {dt > de ? <span className="badge bg-danger" style={{ width: "160px" }}>Closed</span> : dt < ds ? <span className="badge bg-warning" style={{ width: "160px"}}>Opening Soon</span> : <span className="badge bg-success" style={{ width: "160px"}}>Active</span>}
    </div>
    </div>
    <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>

    <h2 className="card-title" style={{display:"inline"}}><a type="button" style={linkStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={()=>{props.ViewProp(props.proposal)}}>{props.proposal.title}</a></h2>
    {/* <h3 class="card-title">{props.proposal.title}</h3> */}

    <p>{props.proposal.description}</p>
    <p><strong>Deadline : </strong>{props.proposal.end_time}</p>
    </div>

    <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>
    {vote === "vote" ?
    <>
      <div class="col-4"><button type="button" className="btn btn-primary" onClick={()=>{props.Vote(props.proposal.sc_address, abi, props.proposal.mongo_id, 0, props.proposal.keys.split(":")[1], proof)}} style = {{marginLeft: "50px" }}>Agree</button>
      </div>
      <div class="col-4"><button type="button" className="btn btn-primary" onClick={() =>{props.Vote(props.proposal.sc_address, abi, props.proposal.mongo_id, 1, props.proposal.keys.split(":")[1], proof)}} style = {{marginLeft: "50px" }}>Disagree</button>
      </div>
      <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>
    <label htmlFor="title" className="form-label">Encrypted proof</label>
    <textarea className="form-control" id="title" name="title" rows="1" value={proof} onChange={handleOnChange}  ></textarea>
    </div>
      </>: <>
        <div class="col-8"><button type="button" className="btn btn-primary disabled" style = {{marginLeft: "50px" }}>{vote}</button>
      </div>
      </>}
    </div>

    {dt<de ? 
    <div class="row" style={{margin:"15px", marginTop:"0px", textAlign:"left"}}>
        <button type="button" className="btn btn-primary" onClick={() => {props.ViewVoters(props.proposal.mongo_id)}} style={{ marginLeftt: "50px"}}>Check Results</button>
    </div> :<></>}

    </div>
    </>
  )
}

export default Proposal
