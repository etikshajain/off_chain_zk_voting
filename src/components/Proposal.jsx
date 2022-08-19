import React from 'react'
import { useEffect, useState, useContext } from "react";

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
      <div className="my-3">

        {dt > de ? <span className="badge bg-danger" style={{ width: "160px", marginLeft: "25px" }}>Closed</span> : dt < ds ? <span className="badge bg-warning" style={{ width: "160px", marginLeft: "25px" }}>Opening Soon</span> : <span className="badge bg-info" style={{ width: "160px", marginLeft: "25px" }}>Open</span>}

        <div className="card my-2 mx-4" style={{ width: "90%", backgroundColor: "white" }}>
          <div className="card-body">
            <h4 className="card-title" style={{ display: "inline" }}><a type="button" style={linkStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={() => { }}>{props.proposal.title}</a></h4>

            <p style={{ marginBottom: "0px" }} className="my-2"><strong>Description : </strong>{props.proposal.description} </p>
            <p style={{ marginBottom: "0px" }} className="my-2"><strong>Deadline : </strong>{dt > de ? "Ended" : props.proposal.end_time.substring(0, 10)} </p>

            <div className="my-2">
              {vote === "vote" ?
                <button type="button" className="btn btn-primary" onClick={() => { }} style={{ marginLeftt: "50px" }}>Vote</button>
                : <button className="btn btn-primary disabled" style={{ marginBottom: "0px" }}>{vote}</button>}

              <button type="button" className="btn btn-primary" onClick={() => { }} style={{ marginLeftt: "50px" }}>View Voters</button>
            </div>

          </div>
        </div>



      </div>
    </>
  )
}

export default Proposal
