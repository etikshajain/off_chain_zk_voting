import React, { useState, useContext } from 'react'
import proposalContext from '../context/context'
import { useNavigate } from "react-router-dom";
// protocol
const CreateProposal = (props) => {
  let navigate = useNavigate();
  const { addProposal } = useContext(proposalContext);
  const [proposal, setProposal] = useState({title: "", description: "", start_time: "", end_time: "", voting_type: ""})

  const handleClick = async (e) => {
    e.preventDefault(); //to prevent page reload upon submitting
    addProposal(proposal.title, proposal.description, proposal.start_time, proposal.end_time, proposal.voting_type, props.protocol);
    setProposal({title: "", description: "", start_time: "", end_time: "", voting_type: ""});
    // navigate("/");
  }
  const handleOnChange = (e) => {
    setProposal({ ...proposal, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="container">
        <h1>Create a new Proposal:</h1>
        <form className="my-3">
          <div className="mb-3">

            <label htmlFor="title" className="form-label">Title</label>
            <textarea className="form-control" id="title" name="title" rows="1" value={proposal.title} onChange={handleOnChange}  ></textarea>

            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" value={proposal.description} rows="4" onChange={handleOnChange} placeholder="Enter Text" minLength={3} required></textarea>

            <label htmlFor="start_time" className="form-label">Start Time</label>
            <input type="date" className="form-control" id="start_time" onChange={handleOnChange} name="start_time" value={proposal.start_time} />

            <label htmlFor="end_time" className="form-label">End Time</label>
            <input type="date" className="form-control" id="end_time" onChange={handleOnChange} name="end_time" value={proposal.end_time} />

            <label htmlFor="voting_type" className="form-label">Voting Type</label>
            <textarea className="form-control" id="voting_type" name="voting_type" value={proposal.voting_type} rows="4" onChange={handleOnChange} placeholder="Enter Text" required></textarea>

          </div>
          <div className="my-2">
            <button disabled={proposal.title.length < 1 || proposal.description.length < 3 ? true : false} type="submit" className="btn btn-primary" onClick={handleClick}>Add Proposal</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProposal
